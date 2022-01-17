const { chromium } = require('playwright-chromium');
const express = require('express');
const router = express.Router();
const https = require('https');
const cron = require('node-cron');
const config = require('../config');
const times = config.times;
let task;
const common  = require("../common");
let cronTime = '0 7 * * 1-5';
cronTime = "30 7 * * *";

// This is api call for fetch all the experiments
router.get('/start', async (req, res, next) => {
  console.log('starting the nl2 cron job');
  try {
      //task = cron.schedule('50 57 22 * * 1-7', async () => { //0 0 7 * * 1-5
      task = cron.schedule(cronTime, async () => { //
        let nl2 = config.courts.nl2;
        let obj = await common.open(process.env.RAM_USERNAME,process.env.RAM_PASSWORD);
        await common.book(obj.page,nl2.id,times.ten); // nl2 6-7
        await common.book(obj.page,nl2.id,times.eleven); // nl2 7-8
        await obj.context.close();
        await obj.browser.close();
        console.log(common.getDay()+" nl2 done");
      }, {
        scheduled: true,
        timezone: "America/Los_Angeles"
      });
      res.json({"message": "weekday job nl2 started"});
    } catch (err) {
      next(err);
    }
});

// This is api call for fetch all the experiments
router.get('/stop', async (req, res, next) => {
  try {
    console.log("stoping task");
    task.stop(); 
    delete task;
    res.send ('stopped the cron job');
  } catch (err) {
    next(err);
  }
});

router.get('/book', async (req, res, next) => {
  console.log('starting the booking cron job');
  try {
    let obj = await common.open(process.env.RAM_USERNAME,process.env.RAM_PASSWORD);
    //common.book(obj.page,'tr:nth-child(24) td:nth-child(3)','2','37'); // nl2 6-7
    //common.book(obj.page,'tr:nth-child(26) td:nth-child(2)','2','39'); // nl2 7-8
    await common.sleep(5000);
    console.log("instant book done");
    obj.browser.close();
    obj.context.close();
    res.json({"message": "weekday job nl2 done"});
  } catch (err) {
    next(err);
  }
});

router.get('/list', async (req, res, next) => {
  console.log('List all the tasks');
  try {
    let list = cron.getTasks();
    res.json({"data":list});
  } catch (err) {
    next(err);
  }
});

router.get('/cancel', async (req, res, next) => {
  try {
    let obj = await common.open(process.env.RAM_USERNAME,process.env.RAM_PASSWORD);
    await common.cancel(obj.page,"Ram Iyer"); // nl2 6-7
    await common.cancel(obj.page,"Ram Iyer"); // nl2 7-8
    obj.browser.close();
    obj.context.close();
    res.json({"data":"canceled"});
  } catch (err) {
    next(err);
  }
});


module.exports = router;