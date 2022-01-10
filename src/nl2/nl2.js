const { chromium } = require('playwright');
const express = require('express');
const router = express.Router();
const https = require('https');
const cron = require('node-cron');
const config = require('../config');
const court = config.courts.nl2;
const time = config.times;
let task;
// This is api call for fetch all the experiments
router.get('/start', async (req, res, next) => {
  console.log('starting the booking cron job');
  try {
      //task = cron.schedule('50 57 22 * * 1-7', async () => { //0 0 7 * * 1-5
      task = cron.schedule('0 0 7 * * 1-5', async () => { //
      console.log('running a task 2 seconds');
      const bk = await book();
  }, {
    scheduled: true,
    timezone: "America/Los_Angeles"
  });
  res.send('started the cron job');
  } catch (err) {
    next(err);
  }
});

// This is api call for fetch all the experiments
router.get('/stop', async (req, res, next) => {
  try {
    console.log("stoping task");
    console.log(cron.getTasks());
    task.stop(); 
    delete task;
    res.send ('stopped the cron job');
  } catch (err) {
    next(err);
  }
});

//cron.schedule('0 55 11 * * 1-7', async () => { //* 0 7 * * 1-5

async function book ()  {
  let context;
  let browser
  try{
    console.log('inside the book function');
    const browser = await chromium.launch({
      headless: false
    });
    context = await browser.newContext();
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
    await page.fill('[placeholder="User ID"]', process.env.RAM_USERNAME);
    // Click [placeholder="Password"]
    await page.click('[placeholder="Password"]');
    // Fill [placeholder="Password"]
    await page.fill('[placeholder="Password"]', process.env.RAM_PASSWORD);  
    // Click input:has-text("Sign In")
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/reservations' }*/),
      page.click('input:has-text("Sign In")')
    ]);
    
    // Now I will book the 6-7 Nl2 court
    await page.click(court.sel6);
    await page.selectOption('select[name="Court_Num"]', court.id);
    await page.selectOption('select[name="Start_Time"]', time["6"]);
    // Select 2
    await page.selectOption('select[name="Duration"]', '2');
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/Reservations' }*/),
      page.click('input:has-text("Reserve")')
    ]);

    // Now I will book the 7-8 Nl2 court
    await page.click(court.sel7);
    await page.selectOption('select[name="Court_Num"]', court.id);
    await page.selectOption('select[name="Start_Time"]', time["7"]);
    // Select 2
    await page.selectOption('select[name="Duration"]', '2');
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/Reservations' }*/),
      page.click('input:has-text("Reserve")')
    ]);
    
    // Closing the browser
    console.log("closing the browser in book function");
    await context.close();
    await browser.close();

  } catch (err) {
    console.log(err);
    await context.close();
    await browser.close();
  } finally {
    console.log('closing the browser in finally');
    await context.close();
    await browser.close();
  }

};

module.exports = router;