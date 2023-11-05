const { executeStep } = require("../../utilities/actions");
const data = require("../../data/appData.json");
require("dotenv").config();

exports.LoginPage = class LoginPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.btnLogin = page.locator("//button[text()='Login']");
    this.appTagLine = page.locator("//div[contains(@class,'banner')]");
    this.inputUsername = page.locator("//input[@id='username']");
    this.inputPassword = page.locator("//input[@id='password']");
    this.btnSubmitLogin = page.locator("//input[@id='kc-login']");
  }

  async launchApplication() {
    await executeStep(
      this.test,
      this.page,
      "navigate",
      `Navigating to website ${process.env.WEBSITE_BASE_URL}`,
      [process.env.WEBSITE_BASE_URL]
    );
  }

  async navigatingLoginPortal() {
    await executeStep(
      this.test,
      this.btnLogin,
      "click",
      "Navigating to Login page"
    );
  }
  async loginApplication(username, password) {
    await executeStep(
      this.test,
      this.inputUsername,
      "fill",
      "Entering Username",
      username
    );
    await executeStep(
      this.test,
      this.inputPassword,
      "fill",
      "Entering password",
      password
    );
    await executeStep(
      this.test,
      this.btnSubmitLogin,
      "click",
      "Clicking Login button"
    );
  }
};
