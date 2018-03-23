var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var moment = require('moment');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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

// ENDPOINTS
app.get('/', index);
app.use("/tweets", require('./routes/tweets'));
app.use("/quotes", require("./routes/quotes"));
app.use("/quote-texts", require("./routes/quote-texts"));
app.use("/shows", require("./routes/shows"));
app.use("/show-titles", require("./routes/show-titles"));
app.use("/songs", require("./routes/songs"));
app.use("/song-titles", require("./routes/song-titles"));
app.use("/gifs", require("./routes/gifs"));
app.use("/current-temperature", require("./routes/current-temperature"));
app.use("/todays-forecast", require("./routes/todays-forecast"));
app.use("/dogs", require("./routes/dogs"));
app.use("/cats", require("./routes/cats"));
app.use("/messages", require("./routes/messages"));
app.use("/message-texts", require("./routes/message-texts"));
app.use("/clear-messages", require("./routes/clear-messages"));

// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// HANDLE ERRORS
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;