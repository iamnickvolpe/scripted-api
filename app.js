var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var index = require('./routes/index');

var app = express();

var appURL = "https://morning-headland-43310.herokuapp.com";

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

// WEATHER
var weather;
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

// TOP SONGS
var songs = [
  {
    number: 1,
    name: "God's Plan",
    artist: "Drake",
    audio: appURL+"/audio/drake_gods-plan.mp3"
  },
  {
    number: 2,
    name: "Perfect",
    artist: "Ed Sheeran"
  },
  {
    number: 3,
    name: "Finesse",
    artist: "Bruno Mars & Cardi B"
  },
  {
    number: 4,
    name: "Meant To Be",
    artist: "Bebe Rexha & Florida Georgia Line"
  },
  {
    number: 5,
    name: "Psycho",
    artist: "Post Malone Featuring Ty Dolla $ign"
  },
  {
    number: 6,
    name: "The Middle",
    artist: "Zedd, Maren Morris & Grey"
  },
  {
    number: 7,
    name: "Havana",
    artist: "Camila Cabello Featuring Young Thug"
  },
  {
    number: 8,
    name: "Pray For Me",
    artist: "The Weeknd & Kendrick Lamar"
  },
  {
    number: 9,
    name: "Look Alive",
    artist: "BlocBoy JB Featuring Drake"
  },
  {
    number: 10,
    name: "All The Stars",
    artist: "Kendrick Lamar & SZA"
  }
];

// SERVE WEBSITE
app.use('/', index);

// ENDPOINTS
// - GET CURRENT TEMPERATURE
app.use('/currenttemperature', function(req, res) {
  res.json(weather.current_observation.temp_f);
});

// - GET RANDOM GIF
app.use('/randomgif', function(req, res) {
  res.json(appURL+'/images/gifs/'+(Math.floor(Math.random() * 10) + 1)+'.gif');
});

// - GET RANDOM ANIMAL
app.use('/randomanimal', function(req, res) {
  if(req.query.type === "dog") {
    res.json(appURL+'/images/dogs/'+(Math.floor(Math.random() * 10) + 1)+'.jpg');
  } else if(req.query.type === "cat") {
    res.json(appURL+'/images/cats/'+(Math.floor(Math.random() * 10) + 1)+'.jpg');
  }
});

// - GET GIFS
app.use('/gifs', function(req, res) {
  var data = [];
  for(var i = 1; i <= 10; i++ ) {
    data.push(appURL+'/images/gifs/'+i+'.gif');
  }
  res.json(data);
});

// - GET DOGS
app.use('/dogs', function(req, res) {
  var data = [];
  for(var i = 1; i <= 10; i++ ) {
    data.push(appURL+'/images/dogs/'+i+'.jpg');
  }
  res.json(data);
});

// - GET CATS
app.use('/cats', function(req, res) {
  var data = [];
  for(var i = 1; i <= 10; i++ ) {
    data.push(appURL+'/images/cats/'+i+'.jpg');
  }
  res.json(data);
});

// - GET SONGS
app.use('/songs', function(req, res) {
  res.json(songs);
});

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