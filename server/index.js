const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const hbs = require('hbs');
const config = require('./config');

const port = process.env.PORT || 6001;
const app = express();

hbs.registerPartials('./app/templates/partials', function() {});

app.set('view engine', 'hbs');
app.set('views', './app/templates');

app.use(express.static('./public'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended:false }));

app.get('/*', function(req, res) {
  res.render('index', config);
});

app.listen(port);
console.log('Server started on port', port);
