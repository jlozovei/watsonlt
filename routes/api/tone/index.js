'use strict';

let router = require('express').Router(),
	config = require('config'),
	ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3'),
	tone_analyzer = new ToneAnalyzerV3({
		username: config.get('tone').get('username'),
		password: config.get('tone').get('password'),
		version_date: '2016-05-19'
	});

router.post('/', function (req, resp, next){
	let {text} = req.body;
	tone_analyzer.tone({ text: text },
		function(err, tone) {
			if (err)
				console.log('error:', err);
			else
				resp.status(200).send(tone);
				//console.log(JSON.stringify(tone));
		}
	);
});

module.exports = router;