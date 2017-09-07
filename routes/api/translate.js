'use strict';

let router = require('express').Router(),
	LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2'),
	config = require('config'),
	language_translator = new LanguageTranslatorV2({
		username: config.get('username'),
		password: config.get('password'),
		url: config.get('url')
	});

router.post('/', function (req, resp, next){
	let {text, source, target} = req.body;
	language_translator.translate({
			text: text, source : source, target: target },
		function (err, translation) {
			if (err)
				console.log('error:', err);
			else
				resp.status(200).send(translation);
		});
});


module.exports = router;