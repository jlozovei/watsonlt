'use strict';

let router = require('express').Router();

router.use('/translate', require("./translate"));
router.use('/identify', require("./identify"));

module.exports = router;