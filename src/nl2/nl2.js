const { chromium } = require('playwright-chromium');
const express = require('express');
const router = express.Router();
const https = require('https');
const cron = require('node-cron');
const config = require('../config');
const times = config.times;
let task;
const {Crawler}  = require("../crawler");
let cronTime = '0 7 * * 1-5';
cronTime = config.cronTime;


// This is api call for fetch all the experiments
router.get('/start', async (req, res, next) => {
  console.log('starting the nl2 cron job');
  try {
      //task = cron.schedule('50 57 22 * * 1-7', async () => { //0 0 7 * * 1-5
      task = cron.schedule(cronTime, async () => { //
        let nl2 = config.courts.nl2;
        let usr = process.env.ANAND_USERNAME;
        let pwd = process.env.ANAND_PASSWORD;
        let crawler = await Crawler.build(usr,pwd);
        await crawler.sleep(400);
        await crawler.book(nl2.id,times.eight); //times.eighteen
        await crawler.sleep(200);
        await crawler.book(nl2.id,times.nine); //times.nineteen
        await crawler.sleep(40000);
        await crawler.close();
        console.log("nl2 done");
        console.log(getDay()+" nl2 done");
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
    let nl2 = config.courts.nl2;
    let usr = process.env.ANAND_USERNAME;
    let pwd = process.env.ANAND_PASSWORD;
    let crawler = await Crawler.build(usr,pwd);
    await crawler.sleep(500);
    await crawler.book(nl2.id,times.eight); //times.eighteen
    await crawler.book(nl2.id,times.nine); //times.nineteen
    await crawler.close();
    console.log("nl2 done");
    console.log(getDay()+" nl2 done");
    res.json({"message": "weekday job nl2 started"});
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

function getDay(){
  try {
    let day = new Date().getDay();
    switch(day){
      case 1:
        return 'monday';
      case 2:
        return 'tuesday';
      case 3:
        return 'wednesday';
      case 4:
        return 'thursday';
      case 5:
        return 'friday';
      default:
        return 'weekend';
  }} catch (err) {
    console.log(err);
  }
}
module.exports = router;