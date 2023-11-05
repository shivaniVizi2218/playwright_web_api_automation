const { registerFixture, TestInfo, setConfig } = require('@playwright/test');
const allure = require('allure-commandline');
const path = require('path');
const fs = require('fs');

// Register a fixture to capture screenshots on test failures
registerFixture('screenshotOnFailure', async ({ page, test }) => {
  try {
    // Execute the test
    await test();
  } catch (error) {
    // Test has failed, capture a screenshot
    const screenshotPath = `./allure-results/screenshots/screenshot.png`;
    await page.screenshot({ path: screenshotPath });

    // Attach the screenshot to the Allure report
    allure(['add', 'attachment', 'Screenshot', fs.readFileSync(screenshotPath), 'image/png']);
  }
});



// Set Allure output directory
setConfig({
  outputDir: path.resolve(__dirname, 'allure-results'),
});


