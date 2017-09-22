let ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3'),
	tone_analyzer = new ToneAnalyzerV3({
		username: config.get('translation').get('username'),
		password: config.get('translation').get('password'),
		version_date: '2016-05-19'
	});

tone_analyzer.tone({ text: 'Greetings from Watson Developer Cloud!' },
	function(err, tone) {
		if (err)
			console.log(err);
		else
			console.log(JSON.stringify(tone, null, 2));
	}
);