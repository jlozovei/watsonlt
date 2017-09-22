'use strict';

let router = require('express').Router();

router.use('/', require('./views'));
router.use('/api', require('./api/index'));

module.exports = router;