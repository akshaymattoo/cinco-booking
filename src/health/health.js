const express = require('express');
const router = express.Router();
const https = require('https');
const cron = require('node-cron');
const axios = require('axios');
let task;
// This is api call for fetch all the experiments
router.get('/', async (req, res, next) => {
  console.log('starting the health cron job');
  try {
      //task = cron.schedule('50 57 22 * * 1-7', async () => { //0 0 7 * * 1-5
      task = cron.schedule('* * */1 * * *', async () => { //
      //console.log("in every 5th second"+process.env.URL+'test');
      let res = await axios.get(process.env.URL+'test');
      console.log("Every hour result - "+res.data);
  }, {
    scheduled: true,
    timezone: "America/Los_Angeles"
  });
  res.send('response from health cron job');
  } catch (err) {
    next(err);
  }
});

router.get('/stop', async (req, res, next) => {
  console.log('stoping the health cron job');
  try {
    console.log("stoping health task");
    console.log(cron.getTasks());
    task.stop(); 
    delete task;
    res.send ('stopped health the cron job');
  } catch (err) {
    next(err);
  }
});
module.exports = router;