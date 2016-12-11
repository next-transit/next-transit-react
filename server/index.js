// require('date-utils');

var express = require('express'),
  bodyParser = require('body-parser'),
  compression = require('compression'),
  hbs = require('hbs'),
  port = process.env.PORT || 6001,
  config = require('./config');

var app = express();

app.set('view engine', 'hbs');
app.set('views', './app/templates');

app.use(express.static('./public'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended:false }));
// app.use(express.cookieParser());
// app.use(express.cookieSession({ secret:'bsl-mfl' }));

app.get('/*', function(req, res) {
  res.render('index', config);
});

app.listen(port);
console.log('Server started on port', port);
