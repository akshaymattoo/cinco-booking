const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

const middlewares = require('./middlewares');

const nl2 = require('./nl2');
const health = require('./health');

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


app.use('/api/v1', nl2);
app.use('/api/v1', health);


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
