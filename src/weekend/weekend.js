const express = require('express');
const router = express.Router();
const https = require('https');
const cron = require('node-cron');
const axios = require('axios');
let task1,task2,task3,task4,task5,task6;
const common  = require("../common");
const cronTime = "0 7 * * 6-7";
// This is api call for fetch all the experiments
router.get('/ws1', async (req, res, next) => {
  console.log('starting the ws1 cron job');
  try {
    task1 = cron.schedule(cronTime, async () => {
      let obj = await common.open(process.env.SUNIL_USERNAME,process.env.SUNIL_PASSWORD);
      common.book(obj.page,'tr:nth-child(4) td:nth-child(8)','7','17'); // ws1 8-9
      common.book(obj.page,'tr:nth-child(6) td:nth-child(8)','7','19'); // ws1 9-10
      await common.sleep(90000);
      console.log("ws1 done");
      obj.browser.close();
      obj.context.close();
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
      let obj = await common.open(process.env.RAM_USERNAME,process.env.RAM_PASSWORD);
      common.book(obj.page,'tr:nth-child(4) td:nth-child(9)','8','17'); // ws2 8-9
      common.book(obj.page,'tr:nth-child(6) td:nth-child(9)','8','19'); // ws2 9-10
      await common.sleep(90000);
      console.log("ws2 done");
      obj.browser.close();
      obj.context.close();
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
      let obj = await common.open(process.env.ANUSHA_USERNAME,process.env.ANUSHA_PASSWORD);
      common.book(obj.page,'tr:nth-child(4) td:nth-child(10)','9','17'); // ws3 8-9
      common.book(obj.page,'tr:nth-child(6) td:nth-child(10)','9','19'); // ws3 9-10
      await common.sleep(90000);
      console.log("ws3 done");
      obj.browser.close();
      obj.context.close();
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
      let obj =  await common.open(process.env.RAVI_USERNAME,process.env.RAVI_PASSWORD);
      common.book(obj.page,'tr:nth-child(4) td:nth-child(11)','10','17'); // ws4 8-9
      common.book(obj.page,'tr:nth-child(6) td:nth-child(11)','10','19'); // ws4 9-10
      await common.sleep(90000);
      console.log("ws4 done");
      obj.browser.close();
      obj.context.close();
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
      let obj =  await common.open(process.env.ANAND_USERNAME,process.env.ANAND_PASSWORD);
      common.book(obj.page,'tr:nth-child(8) td:nth-child(8)','7','21'); // ws1 10-11
      common.book(obj.page,'tr:nth-child(8) td:nth-child(9)','8','21'); // ws2 10-11
      await common.sleep(90000);
      console.log("ws5 done");
      obj.browser.close();
      obj.context.close();
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
      let obj =  await common.open(process.env.UDAYA_USERNAME,process.env.UDAYA_PASSWORD);
      common.book(obj.page,'tr:nth-child(8) td:nth-child(10)','9','21'); // ws3 10-11
      common.book(obj.page,'tr:nth-child(8) td:nth-child(11)','10','21'); // ws4 10-11
      await common.sleep(90000);
      console.log("ws6 done");
      obj.browser.close();
      obj.context.close();
    }, {
      scheduled: true,
      timezone: "America/Los_Angeles"
    });
    res.json({"message": "weekend job ws3 10-11 ws4 10-11 started"});
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