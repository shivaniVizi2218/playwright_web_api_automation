const { executeStep } = require("../../utilities/actions");
const data = require("../../data/appData.json");
require("dotenv").config();

exports.DashboardPage = class DashboardPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.logo = page.locator("//a[@class='header__logo']");
    this.iconProfile = page.locator("//img[contains(@class,'userIcon')]");
    this.btnLogOut = page.locator("(//button[@id='logoutButton'])[1]");
    this.labelUpdateProfile = page.locator(
      "//a[contains(text(),'Update Profile')]"
    );
    this.inputFirstname = page.locator("//input[@id='firstName']");
    this.inputLastname = page.locator("//input[@id='lastName']");
    this.inputUserEmail = page.locator("//input[@id='email']");
    this.dropdownCareerGoal = page.locator("//input[@id='goal']");
    this.optionCareerGoal = page.locator(
      "//div[@id='goal-menu']//a[@id='goal-select-option-2']"
    );
    this.checkboxProfileConsent = page.locator(
      "//span[contains(text(),'I agree to provide more information about myself')]"
    );
    this.dropdownGender = page.locator("//input[@id='gender']");
    this.optionFemale = page.locator(
      "//div[@id='gender-menu']/a[@title='Female']"
    );
    this.checkboxSubscribe = page.locator("//input[@id='comOptIn']");
    this.btnSave = page.locator("//button[text()='Save']");
  }

  async navigateToInfoPanel() {
    await executeStep(
      this.test,
      this.iconProfile,
      "click",
      "Clicking Profile icon in dashboard page"
    );
    await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  }
  async updateProfilePage() {
    await this.navigateToInfoPanel();
    await executeStep(
      this.test,
      this.labelUpdateProfile,
      "click",
      "Navigating to Update Profile page"
    );
  }
  async settingCareerGoal() {
    await executeStep(
      this.test,
      this.dropdownCareerGoal,
      "click",
      "Clicking dropdown for career goal"
    );
    await executeStep(
      this.test,
      this.optionCareerGoal,
      "click",
      "Selecting an option"
    );
  }
  async checkingProfileConsent() {
    await executeStep(
      this.test,
      this.checkboxProfileConsent,
      "click",
      "Profile consent checkbox is checked"
    );
  }
  async selectGender() {
    await executeStep(
      this.test,
      this.dropdownGender,
      "click",
      "Clicking dropdown to select Gender"
    );
    await executeStep(
      this.test,
      this.optionFemale,
      "click",
      "Selecting option Female"
    );
  }
  async logOut() {
    await this.navigateToInfoPanel();
    await executeStep(
      this.test,
      this.btnLogOut,
      "click",
      "Logging out the user"
    );
  }
};
