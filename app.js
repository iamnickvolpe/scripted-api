var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var users = require('./routes/users');
var app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// SET UP EXPRESS
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ALLOW CROSS-ORIGIN REQUESTS
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var weather;
var list = [];
function getWeather(callback) {
  request('http://api.wunderground.com/api/f94efdf771bdd8f5/conditions/forecast/q/10011.json', function(error, response, body) {
    callback(JSON.parse(body));
  });
}

getWeather(function(data) {
  weather = data;
});

setInterval(function() {
  getWeather(function(data) {
    weather = data;
  });
}, 1800000);

// ENDPOINTS
app.use('/users', users);
app.get('/weather', function(req, res) {
  res.json(weather.current_observation.temp_f);
});
app.post('/list', function(req, res) {
  list.push(req.body);
});
app.get('/list', function(req, res) {
  res.json(list);
});

// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
