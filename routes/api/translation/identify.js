'use strict';

let router = require('express').Router(),
	config = require('config'),
	LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2'),
	language_translator = new LanguageTranslatorV2({
		username: config.get('translation').get('username'),
		password: config.get('translation').get('password'),
		url: config.get('translation').get('url')
	});

router.post('/', function (req, resp, next){
	let {text} = req.body;
	language_translator.identify({ text: text },
	function (err, language) {
		if (err)
			resp.status(400).send({error: err});
		else
			resp.status(200).send(language);
	});
});


module.exports = router;