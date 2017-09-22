let NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js'),
	config = require('config'),
	nlu = new NaturalLanguageUnderstandingV1({
		username: config.get('nlu').get('username'),
		password: config.get('nlu').get('password'),
		version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
	});

nlu.analyze({
	'url': 'https://www.tecmundo.com.br/software/121669-4-coisas-ibm-watson-fazendo-brasil.htm',
	'features': {
		'categories': {},
		'concepts': {},
		'emotion': {},
		'entities': {},
		'keywords': {},
		'metadata': {},
		'relations': {},
		'sentiment': {},
	}
}, function(err, response) {
	if (err)
		console.log('error:', err);
	else
		console.log(JSON.stringify(response, null, 4));
});