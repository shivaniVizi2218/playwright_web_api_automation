const { test, expect, request } = require("@playwright/test");
const payLoadData = {
  userEmail: "priyanka@gmail.com",
  userPassword: "Priya@56",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }],
};
require("dotenv").config();
let token, orderID, orderjson;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: payLoadData,
    }
  );
  expect(await response.ok()).toBeTruthy();
  const responseValue = await response.json();
  token = responseValue.token;
  console.log("the token is",token);
  let orderresponse = await apiContext.post(
   process.env.createOrder_APIcall,
    {
      data: orderPayload,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  orderjson = await orderresponse.json();
  orderID = orderjson.orders[0];
});

test("login functionality", async ({ page }) => {
  page.addInitScript((x) => {
    window.localStorage.setItem("token", x);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("//ul/li[3]/button").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const rowId = await rows.nth(i).locator("th").textContent();
    if (orderID.includes(rowId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderDetails = await page.locator(".col-text").textContent();
  expect(orderID.includes(orderDetails)).toBeTruthy();
});


test("posting data using writeSync",async()=>{
  const fs=require('fs');
  fs.writeFileSync(`${process.cwd()}\\data\\orderData.json`,JSON.stringify(orderjson));
})

