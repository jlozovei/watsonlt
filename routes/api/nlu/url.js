'use strict';

let router = require('express').Router(),
	config = require('config'),
	NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js'),
	nlu = new NaturalLanguageUnderstandingV1({
		username: config.get('nlu').get('username'),
		password: config.get('nlu').get('password'),
		version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
	});

router.post('/', function (req, resp, next){
	let {url} = req.body;
	nlu.analyze({
		'url': url,
		'features': {
			'categories': {},
			'entities': {},
			'keywords': {},
			'metadata': {},
			'relations': {},
			'sentiment': {},
		}
	}, function(err, response) {
		if (err)
			resp.status(400).send({error: err});
		else
			resp.status(200).send(response);
	});
});

module.exports = router;