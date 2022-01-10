const express = require('express');

const mf = require('./nl2');

const router = express.Router();

router.use('/nl2', mf);

module.exports = router;
