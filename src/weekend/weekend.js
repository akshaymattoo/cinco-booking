const express = require('express');
const router = express.Router();
const https = require('https');
const cron = require('node-cron');
let task1,task2,task3,task4,task5,task6;
const {Crawler}  = require("../crawler");
let  cronTime = "0 7 * * 6-7";
const config = require('../config');
const { time } = require('console');
let times = config.times;
cronTime = config.cronTime;

// This is api call for fetch all the experiments
router.get('/ws1', async (req, res, next) => {
  console.log('starting the ws1 cron job');
  try {
    task1 = cron.schedule(cronTime, async () => {
      let ws1 = config.courts.ws1;
      let usr = process.env.SUNIL_USERNAME;
      let pwd = process.env.SUNIL_PASSWORD;
      let crawler = await Crawler.build(usr,pwd);
      await crawler.book(ws1.id,times.eight);
      await crawler.book(ws1.id,times.nine);
      await crawler.close();
      console.log("ws1 done");
    }, {
      scheduled: true,
      timezone: "America/Los_Angeles"
    });
    res.json({"message": "weekend job ws1 started"});
  } catch (err) {
    next(err);
  }
});

router.get('/ws2', async (req, res, next) => {
  console.log('starting the ws2 cron job');
  try {
    task2 = cron.schedule(cronTime, async () => {
      let ws2 = config.courts.ws2;
      let usr = process.env.RAM_USERNAME;
      let pwd = process.env.RAM_PASSWORD;
      let crawler = await Crawler.build(usr,pwd);
      await crawler.book(ws2.id,times.eight);
      await crawler.book(ws2.id,times.nine);
      await crawler.close();
      console.log("ws2 done");
    }, {
      scheduled: true,
      timezone: "America/Los_Angeles"
    });
    res.json({"message": "weekend job ws2 started"});
  } catch (err) {
    next(err);
  }
});

router.get('/ws3', async (req, res, next) => {
  console.log('starting the ws3 cron job');
  try {
    task3 = cron.schedule(cronTime, async () => {
      let ws3 = config.courts.ws3;
      let usr = process.env.ANUSHA_USERNAME;
      let pwd = process.env.ANUSHA_PASSWORD;
      let crawler = await Crawler.build(usr,pwd);
      await crawler.sleep(400);
      await crawler.book(ws3.id,times.eight);
      await crawler.sleep(200);
      await crawler.book(ws3.id,times.nine);
      //await crawler.sleep(50000);
      await crawler.close();
      console.log("ws3 done");
    }, {
      scheduled: true,
      timezone: "America/Los_Angeles"
    });
    res.json({"message": "weekend job ws3 started"});
  } catch (err) {
    next(err);
  }
});

router.get('/ws4', async (req, res, next) => {
  console.log('starting the ws4 cron job');
  try {
    task4 = cron.schedule(cronTime, async () => {
      let ws4 = config.courts.ws4;
      let usr = process.env.RAVI_USERNAME;
      let pwd = process.env.RAVI_PASSWORD;
      let crawler = await Crawler.build(usr,pwd);
      await crawler.sleep(400);
      await crawler.book(ws4.id,times.eight);
      await crawler.sleep(200);
      await crawler.book(ws4.id,times.nine);
      //await crawler.sleep(45000);
      await crawler.close();
      console.log("ws4 done");
    }, {
      scheduled: true,
      timezone: "America/Los_Angeles"
    });
    res.json({"message": "weekend job ws4 started"});
  } catch (err) {
    next(err);
  }
});

router.get('/ws5', async (req, res, next) => {
  console.log('starting the ws1 10-11 ws2 10-11 cron job');
  try {
    task5 = cron.schedule(cronTime, async () => {    
      let usr = process.env.ANAND_USERNAME;
      let pwd = process.env.ANAND_PASSWORD;
      let crawler = await Crawler.build(usr,pwd);
      await crawler.book(config.courts.ws1.id,times.ten);
      await crawler.book(config.courts.ws2.id,times.ten);
      await crawler.close();
      console.log("ws5 done");
    }, {
      scheduled: true,
      timezone: "America/Los_Angeles"
    });
    res.json({"message": "weekend job ws1 10-11 ws2 10-11 started"});
  } catch (err) {
    next(err);
  }
});

router.get('/ws6', async (req, res, next) => {
  console.log('starting the ws3 10-11 ws4 10-11 cron job');
  try {
    task6 = cron.schedule(cronTime, async () => { 
      let usr = process.env.UDAYA_USERNAME;
      let pwd = process.env.UDAYA_PASSWORD;
      let crawler = await Crawler.build(usr,pwd);
      await crawler.book(config.courts.ws3.id,times.ten);
      await crawler.book(config.courts.ws4.id,times.ten);
      await crawler.close();
      console.log("ws6 done");
    }, {
      scheduled: true,
      timezone: "America/Los_Angeles"
    });
    res.json({"message": "weekend job ws3 10-11 ws4 10-11 started"});
  } catch (err) {
    next(err);
  }
});

router.get('/cancel', async (req, res, next) => {
  try {
    let court = req.query.court;
    switch (court) {
      case 'ws1':
        console.log('cancelling ws1 cron job');
        break;
      case 'ws2':
        console.log('cancelling ws2 cron job');
        break;
      case 'ws3':
        console.log('cancelling ws3 cron job');
        break;
      case 'ws4':
        console.log('cancelling ws4 cron job');
        break;
    }
    res.json({"message": "cancelling the cron job for "+court});
    // Here I will write logic to cancel reservation
  } catch(err){
    next(err);
  }
});

router.get('/ws7', async (req, res, next) => {
  console.log('starting the ws3 cron job');
  try {
     
    let ws3 = config.courts.ws3;
    let usr = process.env.ANUSHA_USERNAME;
    let pwd = process.env.ANUSHA_PASSWORD;
    let crawler = await Crawler.build(usr,pwd);
    await crawler.book(ws3.id,times.eight);
    await crawler.book(ws3.id,times.nine);
    console.log("ws7 done");
     
    res.json({"message": "weekend job ws3 started"});
  } catch (err) {
    next(err);
  }
});

/*
//task = cron.schedule('50 57 2  * * 1-7', async () => { //0 0 7 * * 1-5
    // this job will run every saturday at 7 am
    task = cron.schedule('0 7 * * 6', async () => { //
    //console.log("in every 5th second"+process.env.URL+'test');
    let res = await axios.get(process.env.URL+'test');
    console.log("Every hour result - "+res.data);
    }, {
        scheduled: true,
        timezone: "America/Los_Angeles"
    });
    res.send('response from health cron job');
*/

router.get('/stopall', async (req, res, next) => {
  try {
    console.log("stoping all weekend cron jobs task");
    task1.stop(); 
    delete task1;

    task2.stop(); 
    delete task2;

    task3.stop(); 
    delete task3;

    task4.stop(); 
    delete task4;

    task5.stop(); 
    delete task5;

    task6.stop(); 
    delete task6;
    res.json ({'message':'stopped all weekend cron job'});
  } catch (err) {
    next(err);
  }
});
module.exports = router;