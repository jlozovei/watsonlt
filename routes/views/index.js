'use strict';

let express = require('express'),
	router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index');
});

module.exports = router;