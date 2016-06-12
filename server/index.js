// require('date-utils');

var express = require('express'),
  bodyParser = require('body-parser'),
  compression = require('compression'),
  // shack = require('shack'),
  hbs = require('hbs'),
  // app_ctrl = require('./lib/controllers/app'),
  port = process.env.PORT || 5000;

// hbs.registerPartials('./app/templates/partials', function() {});

var app = express();

app.set('view engine', 'hbs');
app.set('views', './app/templates');

app.use(express.static('./public'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended:false }));
// app.use(express.cookieParser());
// app.use(express.cookieSession({ secret:'bsl-mfl' }));

app.get('/*', function(req, res) {
  res.render('index');
});

app.listen(port);
console.log('Server started on port', port);
