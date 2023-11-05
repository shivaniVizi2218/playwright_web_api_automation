const { test, expect } = require("@playwright/test");
const sections = require("../pages/pageIndex");
const data = require("../../data/appData.json");
const exp = require("constants");
require("dotenv").config();

test("Launching main website", async ({ page }) => {
  const ciscoLogin = new sections.LoginPage(page, test);
  await ciscoLogin.launchApplication();
  await ciscoLogin.navigatingLoginPortal();
  await expect(
    ciscoLogin.appTagLine,
    "Checking whether Cisco Skills tagline is present or not"
  ).toContainText(data.login.tagLine);
  await ciscoLogin.loginApplication(
    [process.env.USERMAIL],
    [process.env.PASSWORD]
  );
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  const ciscoDashboard = new sections.DashboardPage(page, test);
  await expect(
    page,
    "Validating whether it navigated to Dashboard page"
  ).toHaveURL(data.dashboard.dashboard_URL);
  await expect(
    ciscoDashboard.logo,
    "Checking the Cisco Skills logo"
  ).toBeVisible();
  await ciscoDashboard.logOut();
});

test("Validating Profile Portal", async ({ page }) => {
  const ciscoLogin = new sections.LoginPage(page, test);
  await ciscoLogin.launchApplication();
  await ciscoLogin.navigatingLoginPortal();
  await ciscoLogin.loginApplication(
    [process.env.USERMAIL],
    [process.env.PASSWORD]
  );
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));

  const ciscoProfile = new sections.DashboardPage(page, test);
  await ciscoProfile.updateProfilePage();
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  await expect(
    page,

    "Checking whether it navigated to Profile page or not"
  ).toHaveURL(data.profile.profile_URL);
  await page.waitForTimeout(parseInt(process.env.LARGE_WAIT));
  await expect(
    ciscoProfile.inputFirstname,
    "Validating first-name"
  ).toHaveAttribute("value", data.profile.firstName);
  await expect(
    ciscoProfile.inputLastname,
    "Validating user last-name"
  ).toHaveAttribute("value", data.profile.lastName);
  await expect(
    ciscoProfile.inputUserEmail,
    "Validating user email"
  ).toHaveAttribute("value", process.env.USERMAIL);
  await ciscoProfile.settingCareerGoal();
  await ciscoProfile.checkingProfileConsent();
  await ciscoProfile.selectGender();
  await expect(
    ciscoProfile.checkboxSubscribe,
    "Validating whether Subcribe checkbox is checked"
  ).toHaveAttribute("value", "true");
  const isDisabled = await ciscoProfile.btnSave.getAttribute("disabled");
  expect(
    isDisabled,
    "Checking whether Save button is Enabled or not"
  ).toBeFalsy();
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  await page.goBack();
  const ciscoDashboard = new sections.DashboardPage(page, test);
  await ciscoDashboard.logOut();
  await page.waitForTimeout(parseInt(process.env.MEDIUM_WAIT));
});

test("Validating Search Catalog Bar", async ({ page }) => {
  const ciscoLogin = new sections.LoginPage(page, test);
  await ciscoLogin.launchApplication();
  await ciscoLogin.navigatingLoginPortal();
  await ciscoLogin.loginApplication(
    [process.env.USERMAIL],
    [process.env.PASSWORD]
  );
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  const ciscoSearch = new sections.SearchCatalogTab(page, test);
  await ciscoSearch.searchingCatalog();
  await expect(
    ciscoSearch.tabInProgress,
    "Checking whether In-Progress tab is visible or not"
  ).toBeVisible();
  await ciscoSearch.selectingInProgressCourse();
  await expect(
    ciscoSearch.courseTitle,
    "Validating whether 'Introduction to Cybersecurity' added under In-Progress tab"
  ).toHaveAttribute("title", data.catalog.course_Title);
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  await page.goBack();
  const ciscoDashboard = new sections.DashboardPage(page, test);
  await ciscoDashboard.logOut();
  await page.waitForTimeout(parseInt(process.env.MEDIUM_WAIT));
});
