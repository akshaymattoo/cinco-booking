const express = require('express');

const wb = require('./weekend');

const router = express.Router();

router.use('/weekend', wb);

module.exports = router;
