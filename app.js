var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var index = require('./routes/index');
var Twitter = require('twitter');
var moment = require('moment');

var client = new Twitter({
  consumer_key: 'thOZBUn5aBGEu8cPk76cfkNHM',
  consumer_secret: '2ZYgd2o376l4tkYOtmdydRBc65kPKWFK7cuZqLh3v5LOCXf0oK',
  access_token_key: '211250937-XyVCatXtxetCarOfUd1q83mu8nGdsBJvwNTt08gk',
  access_token_secret: 'ClqfFw0t6N3yO5QBN1Bu4WhZY2jFPNkEJsfQ2IXE0gaWn'
});

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

// TWITTER
var tweets;
function getTweets(callback) {
  var params = {screen_name: 'nodejs'};
  client.get('search/tweets', {q: 'ScriptEdHack'}, function(error, tweets, response) {
    if (!error) {
      callback(tweets.statuses);
    }
  });
}

getTweets(function(data) {
  tweets = data;
});

setInterval(function() {
  getTweets(function(data) {
    tweets = data;
  });
}, 60000);

// TOP SONGS
var songs = [
  {
    rank: 1,
    title: "God's Plan",
    artist: "Drake",
    artwork: appURL+"/images/albums/0.png",
    audio: appURL+"/audio/drake_gods-plan.mp3"
  },
  {
    rank: 2,
    title: "Perfect",
    artist: "Ed Sheeran",
    artwork: appURL+"/images/albums/1.png",
    audio: appURL+"ed-sheeran_perfect.mp3"
  },
  {
    rank: 3,
    title: "Finesse",
    artist: "Bruno Mars & Cardi B",
    artwork: appURL+"/images/albums/2.png"
  },
  {
    rank: 4,
    title: "Meant To Be",
    artist: "Bebe Rexha & Florida Georgia Line",
    artwork: appURL+"/images/albums/3.png"
  },
  {
    rank: 5,
    title: "Psycho",
    artist: "Post Malone Featuring Ty Dolla $ign",
    artwork: appURL+"/images/albums/4.png"
  },
  {
    rank: 6,
    title: "The Middle",
    artist: "Zedd, Maren Morris & Grey",
    artwork: appURL+"/images/albums/5.png"
  },
  {
    rank: 7,
    title: "Havana",
    artist: "Camila Cabello Featuring Young Thug",
    artwork: appURL+"/images/albums/6.png"
  },
  {
    rank: 8,
    title: "Pray For Me",
    artist: "The Weeknd & Kendrick Lamar",
    artwork: appURL+"/images/albums/7.png"
  },
  {
    rank: 9,
    title: "Look Alive",
    artist: "BlocBoy JB Featuring Drake",
    artwork: appURL+"/images/albums/8.png"
  },
  {
    rank: 10,
    title: "All The Stars",
    artist: "Kendrick Lamar & SZA",
    artwork: appURL+"/images/albums/9.png"
  }
];

// TOP SHOWS
var shows = [
  {
    title: "Money Heist",
    artwork: appURL+"/images/shows/0.png"
  },
  {
    title: "Dark",
    artwork: appURL+"/images/shows/1.png"
  },
  {
    title: "Stranger Things",
    artwork: appURL+"/images/shows/2.png"
  },
  {
    title: "13 Reasons Why",
    artwork: appURL+"/images/shows/3.png"
  },
  {
    title: "Black Mirror",
    artwork: appURL+"/images/shows/4.png"
  },
  {
    title: "Jessica Jones",
    artwork: appURL+"/images/shows/5.png"
  },
  {
    title: "The Crown",
    artwork: appURL+"/images/shows/6.png"
  },
  {
    title: "A Series of Unfortunate Events",
    artwork: appURL+"/images/shows/7.png"
  },
  {
    title: "Orange is the New Black",
    artwork: appURL+"/images/shows/8.png"
  },
  {
    title: "Daredevil",
    artwork: appURL+"/images/shows/9.png"
  }
];

// QUOTES
var quotes = [
  {
    text: "Life is about making an impact, not making an income.",
    author: "Kevin Kruse"
  },
  {
    text: "Whatever the mind of man can conceive and believe, it can achieve.",
    author: "Napoleon Hill"
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
  {
    text: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
    author: "Robert Frost"
  },
  {
    text: "I attribute my success to this: I never gave or took any excuse.",
    author: "Florence Nightingale"
  },
  {
    text: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky"
  },
  {
    text: "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
    author: "Michael Jordan"
  },
  {
    text: "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart"
  },
  {
    text: "Every strike brings me closer to the next home run.",
    author: "Babe Ruth"
  },
  {
    text: "Definiteness of purpose is the starting point of all achievement.",
    author: "W. Clement Stone"
  }
];

var messages = [];

// SERVE WEBSITE
app.get('/', index);

// ENDPOINTS
// - GET CURRENT TEMPERATURE
app.get('/current-temperature', function(req, res) {
  res.json(weather.current_observation.temp_f);
});

// - GET TODAY'S FORECAST
app.get('/todays-forecast', function(req, res) {
  res.json({
    high: weather.forecast.simpleforecast.forecastday[0].high.fahrenheit,
    low: weather.forecast.simpleforecast.forecastday[0].low.fahrenheit,
    conditions: weather.forecast.simpleforecast.forecastday[0].conditions,
    icon: weather.forecast.simpleforecast.forecastday[0].icon_url
  });
});

// - GET RANDOM GIF
app.get('/gifs/random', function(req, res) {
  res.json(appURL+'/images/gifs/'+(Math.floor(Math.random() * 10))+'.gif');
});

// - GET GIF BY ID
app.get('/gifs/:id', function(req, res, next) {
  if(req.params.id > -1 && req.params.id < 10) {
    res.json(appURL+'/images/gifs/'+req.params.id+'.gif');
  } else {
    var err = new Error('You must have a valid GIF ID');
    err.status = 400;
    next(err);
  }
});

// - GET GIFS
app.get('/gifs', function(req, res) {
  var data = [];
  for(var i = 0; i < 10; i++ ) {
    data.push(appURL+'/images/gifs/'+i+'.gif');
  }
  res.json(data);
});

// - GET RANDOM SONG
app.get('/songs/random', function(req, res) {
  res.json(songs[Math.floor(Math.random() * 10)]);
});

// - GET SONG BY ID
app.get('/songs/:id', function(req, res) {
  if(req.params.id > -1 && req.params.id < 10) {
    res.json(songs[req.params.id]);
  } else {
    var err = new Error('You must have a valid Song ID');
    err.status = 400;
    next(err);
  }
});

// - GET SONGS
app.get('/songs', function(req, res) {
  var newSongs = songs;
  if(req.query.sort === "desc") {
    newSongs.sort(function (a, b) {
      return b.rank - a.rank;
    });
  } else {
    newSongs.sort(function (a, b) {
      return a.rank - b.rank;
    });
  }
  res.json(newSongs);
});

// - GET RANDOM SONG TITLE
app.get('/song-titles/random', function(req, res) {
  res.json(songs[Math.floor(Math.random() * 10)].title);
});

// - GET SONG TITLE BY ID
app.get('/song-titles/:id', function(req, res) {
  if(req.params.id > -1 && req.params.id < 10) {
    res.json(songs[req.params.id].title);
  } else {
    var err = new Error('You must have a valid Song ID');
    err.status = 400;
    next(err);
  }
});

// - GET SONG TITLES
app.get('/song-titles', function(req, res) {
  var data = [];
  var newSongs = songs;
  if(req.query.sort === "desc") {
    newSongs.sort(function (a, b) {
      return b.rank - a.rank;
    });
  } else {
    newSongs.sort(function (a, b) {
      return a.rank - b.rank;
    });
  }
  newSongs.forEach(function(song) {
    data.push(song.title);
  });
  res.json(data);
});

// - GET RANDOM SHOW
app.get('/shows/random', function(req, res) {
  res.json(shows[Math.floor(Math.random() * 10)]);
});

// - GET SHOW BY ID
app.get('/shows/:id', function(req, res) {
  if(req.params.id > -1 && req.params.id < 10) {
    res.json(shows[req.params.id]);
  } else {
    var err = new Error('You must have a valid Show ID');
    err.status = 400;
    next(err);
  }
});

// - GET SHOWS
app.get('/shows', function(req, res) {
  res.json(shows);
});

// - GET RANDOM SHOW TITLE
app.get('/show-titles/random', function(req, res) {
  res.json(shows[Math.floor(Math.random() * 10)].title);
});

// - GET SHOW TITLE BY ID
app.get('/show-titles/:id', function(req, res) {
  if(req.params.id > -1 && req.params.id < 10) {
    res.json(shows[req.params.id].title);
  } else {
    var err = new Error('You must have a valid Show ID');
    err.status = 400;
    next(err);
  }
});

// - GET SHOW TITLES
app.get('/show-titles', function(req, res) {
  var data = [];
  shows.forEach(function(show) {
    data.push(show.title);
  });
  res.json(data);
});

// - GET DOGS
app.get('/dogs', function(req, res) {
  var data = [];
  for(var i = 0; i < 10; i++ ) {
    data.push(appURL+'/images/dogs/'+i+'.jpg');
  }
  res.json(data);
});

// - GET CATS
app.get('/cats', function(req, res) {
  var data = [];
  for(var i = 0; i < 10; i++ ) {
    data.push(appURL+'/images/cats/'+i+'.jpg');
  }
  res.json(data);
});

// - GET TWEETS
app.get('/tweets', function(req, res) {
  var newTweets = [];
  tweets.forEach(function(tweet) {

    var image = "";
    if (tweet.entities.media) {
      if(tweet.entities.media[0].type === "photo") {
        image = tweet.entities.media[0].media_url_https;
      }
    }

    newTweets.push({
      text: tweet.text,
      date: moment(tweet.created_at, "UTC").format("dddd, MMMM Do YYYY, h:mm:ssa"),
      author_name: tweet.user.name,
      author_handle: tweet.user.screen_name,
      author_avatar: tweet.user.profile_image_url_https,
      image: image
    });
  });
  res.json(newTweets);
});

// - GET RANDOM QUOTE
app.get('/quotes/random', function(req, res) {
  res.json(quotes[Math.floor(Math.random() * 10)]);
});

// - GET QUOTE BY ID
app.use('/quotes/:id', function(req, res) {
  if(req.params.id > -1 && req.params.id < 10) {
    res.json(quotes[req.params.id]);
  } else {
    var err = new Error('You must have a valid Quote ID');
    err.status = 400;
    next(err);
  }
});

// - GET QUOTES
app.get('/quotes', function(req, res) {
  if(req.query.q) {
    var newQuotes = [];
    quotes.forEach(function(quote) {
      if(quote.text.includes(req.query.q)) {
        newQuotes.push(quote);
      }
    });
    res.json(newQuotes);
  } else {
    res.json(quotes);
  }
});

// - GET RANDOM QUOTE TEXT
app.get('/quote-texts/random', function(req, res) {
  res.json(quotes[Math.floor(Math.random() * 10)].text);
});

// - GET QUOTE TEXTS BY ID
app.get('/quote-texts/:id', function(req, res) {
  if(req.params.id > -1 && req.params.id < 10) {
    res.json(quotes[req.params.id].text);
  } else {
    var err = new Error('You must have a valid Quote ID');
    err.status = 400;
    next(err);
  }
});

// - GET QUOTE TEXTS
app.get('/quote-texts', function(req, res) {
  var newQuotes = [];
  if(req.query.q) {
    quotes.forEach(function(quote) {
      if(quote.text.includes(req.query.q)) {
        newQuotes.push(quote.text);
      }
    });
  } else {
    quotes.forEach(function(quote) {
      newQuotes.push(quote.text);
    });
  }
  res.json(newQuotes);
});

// - GET MESSAGES
app.get('/messages', function(req, res) {
  res.json(messages);
});

// - GET MESSAGE TEXTS
app.get('/message-texts', function(req, res) {
  var data = [];
  messages.forEach(function(message) {
    data.push(message.text);
  });
  res.json(data);
});

// - POST A NEW MESSAGE
app.post('/messages', function(req,res) {
  var author = "Unknown";
  if(req.body.author) {
    author = req.body.author;
  }
  if(req.body.text) {
    messages.push({
      text: req.body.text,
      date: new Date(),
      author: author
    });
  } else {
    var err = new Error('You must add text to your message.');
    err.status = 400;
    next(err);
  }
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