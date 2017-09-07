'use strict';

let router = require('express').Router();

router.use('/', require('./views'));
router.use('/api', require('./api'));

module.exports = router;