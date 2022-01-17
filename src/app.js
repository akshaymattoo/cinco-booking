const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();
const axios = require('axios');
const middlewares = require('./middlewares');
const nl2 = require('./nl2');
const weekend = require('./weekend');

const app = express();

app.set('trust proxy', 1);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get('/startall', async (req, res, next) => {
  try {
    let env = process.env.NODE_ENV;
    let url = "https://cinco-booking.herokuapp.com";
    if(env === 'dev'){
      url = "http://localhost:3000"
    }
    axios.all([
      axios.get(url+'/api/v1/weekend/ws1'),
      axios.get(url+'/api/v1/weekend/ws2'),
      axios.get(url+'/api/v1/weekend/ws3'),
      axios.get(url+'/api/v1/weekend/ws4'),
      axios.get(url+'/api/v1/weekend/ws5'),
      axios.get(url+'/api/v1/weekend/ws6'),
      axios.get(url+'api/v1/nl2/start'),
    ])
    res.json({"message": "All jobs started"});
    // Here I will write logic to cancel reservation
  } catch(err){
    next(err);
  }
});


app.use('/api/v1', nl2);
app.use('/api/v1', weekend);


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
