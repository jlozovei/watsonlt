let LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2'),
    config = require('config'),
    language_translator = new LanguageTranslatorV2({
        username: config.get('translation').get('username'),
        password: config.get('translation').get('password'),
        url: config.get('translation').get('url')
    });

language_translator.translate({
    text: 'A sentence must have a verb', source : 'en', target: 'es' },
    function (err, translation) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(translation, null, 4));
});

language_translator.identify({
    text: 'The language translator service takes text input and identifies the language used.' },
    function (err, language) {
    if (err)
        console.log('error:', err);
    else
        console.log(JSON.stringify(language, null, 4));
});