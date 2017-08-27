let express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();



app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', require('./routes'));

module.exports = app;