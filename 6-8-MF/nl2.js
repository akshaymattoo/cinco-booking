const { chromium } = require('playwright');
const ENV = require('dotenv').config().parsed;
var cron = require('node-cron');
//cron.schedule('0 55 11 * * 1-7', async () => { //* 0 7 * * 1-5
cron.schedule('*/15000 * * * * *', async () => { //* 0 7 * * 1-5
    console.log('running a task 15 seconds');
    console.log(ENV.RAM_USERNAME);
    //const bk = await book();
});
async function book ()  {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  // Go to https://sites.onlinecourtreservations.com/devicecheck?from=default&facility=
  await page.goto('https://sites.onlinecourtreservations.com/devicecheck?from=default&facility=');
  // Go to https://sites.onlinecourtreservations.com/facilitycheck
  await page.goto('https://sites.onlinecourtreservations.com/facilitycheck');
  // Select 25
  await page.selectOption('select[name="facility_num"]', '25');
  // Click text=Continue to Site
  await page.click('text=Continue to Site');
  // assert.equal(page.url(), 'https://sites.onlinecourtreservations.com/reservations');
  // Click text=Sign In
  await page.click('text=Sign In');
  // assert.equal(page.url(), 'https://sites.onlinecourtreservations.com/SignIn');
  // Click [placeholder="User ID"]
  await page.click('[placeholder="User ID"]');
  // Fill [placeholder="User ID"]
  await page.fill('[placeholder="User ID"]', ENV.RAM_USERNAME);
  // Click [placeholder="Password"]
  await page.click('[placeholder="Password"]');
  // Fill [placeholder="Password"]
  await page.fill('[placeholder="Password"]', ENV.RAM_USERNAME);  
  // Click input:has-text("Sign In")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/reservations' }*/),
    page.click('input:has-text("Sign In")')
  ]);
  // Click #NextWeek img
  await page.click('#NextWeek img');
  // assert.equal(page.url(), 'https://sites.onlinecourtreservations.com/reservations');
  // Click #NextWeek img
  await page.click('#NextWeek img');
  // assert.equal(page.url(), 'https://sites.onlinecourtreservations.com/reservations');
  // ---------------------
  await context.close();
  await browser.close();
};