const express = require('express');
const router = express.Router();
const https = require('https');
const cron = require('node-cron');
let task1,task2,task3,task4,task5,task6;
const common  = require("../common");
let  cronTime = "0 7 * * 6-7";
cronTime = "30 7 * * *";
//cronTime = "30 01 17 * * *";
const config = require('../config');
const { time } = require('console');
let times = config.times;


// This is api call for fetch all the experiments
router.get('/ws1', async (req, res, next) => {
  console.log('starting the ws1 cron job');
  try {
    task1 = cron.schedule(cronTime, async () => {
      let ws1 = config.courts.ws1;
      let obj = await common.open(process.env.SUNIL_USERNAME,process.env.SUNIL_PASSWORD);
      await common.book(obj.page,ws1.id,times.eight); // ws1 8-9
      await common.book(obj.page,ws1.id,times.nine); // ws1 9-10 'tr:nth-child(6) td:nth-child(8)'
      await obj.context.close();
      await obj.browser.close();
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
      let obj = await common.open(process.env.RAM_USERNAME,process.env.RAM_PASSWORD);
      await common.book(obj.page,ws2.id,times.eight); // ws2 8-9 'tr:nth-child(4) td:nth-child(9)'
      await common.book(obj.page,ws2.id,times.nine); // ws2 9-10 'tr:nth-child(6) td:nth-child(7)'
      await obj.context.close();
      await obj.browser.close();
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
      let id = config.courts.ws3.id;
      let obj = await common.open(process.env.ANUSHA_USERNAME,process.env.ANUSHA_PASSWORD);
      await common.book(obj.page,id,times.eight); // ws3 8-9 'tbody tr td:nth-child(6)'
      await common.book(obj.page,id,times.nine); // ws3 9-10 'tbody tr td:nth-child(7)'
      await obj.context.close();
      await obj.browser.close();
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
      let id = config.courts.ws4.id;
      let obj =  await common.open(process.env.RAVI_USERNAME,process.env.RAVI_PASSWORD);
      await common.book(obj.page,id,times.eight); // ws4 8-9
      await common.book(obj.page,id,times.nine); // ws4 9-10
      await obj.context.close();
      await obj.browser.close();
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
      let obj =  await common.open(process.env.ANAND_USERNAME,process.env.ANAND_PASSWORD);
      await common.book(obj.page,config.courts.ws1.id,times.ten); // ws1 10-11 'tr:nth-child(8) td:nth-child(8)'
      await common.book(obj.page,config.courts.ws2.id,times.ten); // ws2 10-11 'tr:nth-child(8) td:nth-child(9)'
      await obj.context.close();
      await obj.browser.close();
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
      let obj =  await common.open(process.env.UDAYA_USERNAME,process.env.UDAYA_PASSWORD);
      await common.book(obj.page,config.courts.ws3.id,times.ten); // ws3 10-11
      await common.book(obj.page,config.courts.ws4.id,times.ten); // ws4 10-11
      await obj.context.close();
      await obj.browser.close();
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