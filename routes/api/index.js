'use strict';

let router = require('express').Router();

router.use('/translation', require("./translation/index"));
router.use('/tone', require("./tone/index"));
router.use('/nlu', require("./nlu/index"));

module.exports = router;