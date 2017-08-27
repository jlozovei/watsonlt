'use strict';

let express = require('express'),
	router = express.Router();

router.use('/translate', require("./translate"));

module.exports = router;