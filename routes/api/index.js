'use strict';

let express = require('express'),
	router = express.Router();

router.use('/translate', require("./translate"));
router.use('/identify', require("./identify"));

module.exports = router;