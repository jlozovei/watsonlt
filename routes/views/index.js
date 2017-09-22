'use strict';

let router = require('express').Router();

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/translation', function(req, res, next) {
	res.render('translation');
});

router.get('/tone', function(req, res, next) {
	res.render('tone');
});

router.get('/nlu', function(req, res, next) {
	res.render('nlu');
});

module.exports = router;