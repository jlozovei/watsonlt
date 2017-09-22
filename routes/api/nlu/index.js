'use strict';

let router = require('express').Router();

router.use('/text', require('./text'));
router.use('/url', require('./url'));

module.exports = router;