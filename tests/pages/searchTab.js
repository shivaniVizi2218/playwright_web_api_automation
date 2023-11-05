const { executeStep } = require("../../utilities/actions");
const data = require("../../data/appData.json");
require("dotenv").config();

exports.SearchCatalogTab = class SearchCatalogTab {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.searchBar = page.locator("//input[@type='search']");
    this.optionIntro = page.locator(
      "//li//div[text()='Introduction to Cybersecurity']"
    );
    this.tabInProgress = page.locator("//div[text()='In-Progress']");
    this.recentViewedCourse = page.locator(
      "//div[@title='Introduction to Cybersecurity']"
    );
    this.btnViewMore = page.locator("//img[@alt='More']");
    this.btnViewDetails = page.locator("//button[text()='View Details']");
    this.courseTitle = page.locator("//h1[contains(@class,'courseTitle')]");
  }

  async searchingCatalog() {
    await this.page.waitForTimeout(parseInt(process.env.MEDIUM_WAIT));
    await executeStep(
      this.test,
      this.searchBar,
      "fill",
      "Entering course Cybersecurity in searchbar",
      [data.catalog.course]
    );
    await this.page.waitForTimeout(parseInt(process.env.MEDIUM_WAIT));
    await executeStep(
      this.test,
      this.optionIntro,
      "click",
      "Selecting option Introduction to Cybersecurity from suggestions"
    );
    await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    const catalogURL = this.page.url();
    console.log("catalog url ---->", catalogURL);
    await this.page.goBack();
  }
  async selectingInProgressCourse() {
    await executeStep(
      this.test,
      this.btnViewMore,
      "click",
      "Clicking view-more under In-Progress tab"
    );
    await executeStep(
      this.test,
      this.btnViewDetails,
      "click",
      "Selecting View Details "
    );
    await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  }
};
