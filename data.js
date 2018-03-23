var request = require("request");
var Twitter = require("twitter");

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
    text:
      "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
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
    text:
      "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
    author: "Michael Jordan"
  },
  {
    text:
      "The most difficult thing is the decision to act, the rest is merely tenacity.",
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

// QUOTE TEXTS
var quoteTexts = [];
quotes.forEach(function(quote) {
  quoteTexts.push(quote.text);
});

// SHOWS
var shows = [
  {
    title: "Money Heist",
    artwork: process.env.ROOT_URL + "/images/shows/0.png"
  },
  {
    title: "Dark",
    artwork: process.env.ROOT_URL + "/images/shows/1.png"
  },
  {
    title: "Stranger Things",
    artwork: process.env.ROOT_URL + "/images/shows/2.png"
  },
  {
    title: "13 Reasons Why",
    artwork: process.env.ROOT_URL + "/images/shows/3.png"
  },
  {
    title: "Black Mirror",
    artwork: process.env.ROOT_URL + "/images/shows/4.png"
  },
  {
    title: "Jessica Jones",
    artwork: process.env.ROOT_URL + "/images/shows/5.png"
  },
  {
    title: "The Crown",
    artwork: process.env.ROOT_URL + "/images/shows/6.png"
  },
  {
    title: "A Series of Unfortunate Events",
    artwork: process.env.ROOT_URL + "/images/shows/7.png"
  },
  {
    title: "Orange is the New Black",
    artwork: process.env.ROOT_URL + "/images/shows/8.png"
  },
  {
    title: "Daredevil",
    artwork: process.env.ROOT_URL + "/images/shows/9.png"
  }
];

// SHOW TITLES
var showTitles = [];
shows.forEach(function(show) {
  showTitles.push(show.title);
});

// SONGS
var songs = [
  {
    rank: 1,
    title: "God's Plan",
    artist: "Drake",
    artwork: process.env.ROOT_URL + "/images/albums/0.png",
    audio: process.env.ROOT_URL + "/audio/drake_gods-plan.mp3"
  },
  {
    rank: 2,
    title: "Perfect",
    artist: "Ed Sheeran",
    artwork: process.env.ROOT_URL + "/images/albums/1.png",
    audio: process.env.ROOT_URL + "/audio/ed-sheeran_perfect.mp3"
  },
  {
    rank: 3,
    title: "Finesse",
    artist: "Bruno Mars and Cardi B",
    artwork: process.env.ROOT_URL + "/images/albums/2.png",
    audio: process.env.ROOT_URL + "/audio/bruno-mars_finesse.mp3"
  },
  {
    rank: 4,
    title: "Meant To Be",
    artist: "Bebe Rexha and Florida Georgia Line",
    artwork: process.env.ROOT_URL + "/images/albums/3.png",
    audio: process.env.ROOT_URL + "/audio/bebe-rexha_meant-to-be.mp3"
  },
  {
    rank: 5,
    title: "Psycho",
    artist: "Post Malone Featuring Ty Dolla Sign",
    artwork: process.env.ROOT_URL + "/images/albums/4.png",
    audio: process.env.ROOT_URL + "/audio/post-malone_psycho.mp3"
  },
  {
    rank: 6,
    title: "The Middle",
    artist: "Zedd, Maren Morris and Grey",
    artwork: process.env.ROOT_URL + "/images/albums/5.png",
    audio: process.env.ROOT_URL + "/audio/zedd_the-middle.mp3"
  },
  {
    rank: 7,
    title: "Havana",
    artist: "Camila Cabello Featuring Young Thug",
    artwork: process.env.ROOT_URL + "/images/albums/6.png",
    audio: process.env.ROOT_URL + "/audio/camila-cabello_havana.mp3"
  },
  {
    rank: 8,
    title: "Pray For Me",
    artist: "The Weeknd and Kendrick Lamar",
    artwork: process.env.ROOT_URL + "/images/albums/7.png",
    audio: process.env.ROOT_URL + "/audio/the-weeknd_pray-for-me.mp3"
  },
  {
    rank: 9,
    title: "Look Alive",
    artist: "BlocBoy JB Featuring Drake",
    artwork: process.env.ROOT_URL + "/images/albums/8.png",
    audio: process.env.ROOT_URL + "/audio/blocboy_look-alive.mp3"
  },
  {
    rank: 10,
    title: "All The Stars",
    artist: "Kendrick Lamar and SZA",
    artwork: process.env.ROOT_URL + "/images/albums/9.png",
    audio: process.env.ROOT_URL + "/audio/kendrick-lamar_all-the-stars.mp3"
  }
];

// SONG TITLES
var songTitles = [];
songs.forEach(function(song) {
  songTitles.push(song.title);
});

// WEATHER
var weather;
function getWeather(callback) {
  request(
    "http://api.wunderground.com/api/" +
      process.env.WEATHER_UNDERGROUND_KEY +
      "/conditions/forecast/q/10011.json",
    function(error, response, body) {
      callback(JSON.parse(body));
    }
  );
}

getWeather(function(data) {
  weather = data;
});

setInterval(function() {
  getWeather(function(data) {
    weather = data;
  });
}, 1800000);

// MESSAGES
var messages = [];
var messageId = 0;

// TWITTER
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var tweets;
function getTweets(callback) {
  var params = { screen_name: "nodejs" };
  client.get("search/tweets", { q: "ScriptEdHack" }, function(
    error,
    tweets,
    response
  ) {
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

// CATS
var cats = [];
for (var i = 0; i < 10; i++) {
  cats.push(process.env.ROOT_URL + "/images/cats/" + i + ".jpg");
}

// DOGS
var dogs = [];
for (var i = 0; i < 10; i++) {
  dogs.push(process.env.ROOT_URL + "/images/dogs/" + i + ".jpg");
}

// GIFS
var gifs = [];
for (var i = 0; i < 10; i++) {
  gifs.push(process.env.ROOT_URL + "/images/gifs/" + i + ".gif");
}

module.exports = {
  quotes: quotes,
  quoteTexts: quoteTexts,
  shows: shows,
  showTitles: showTitles,
  songs: songs,
  songTitles: songTitles,
  getWeather: function() {
    return weather;
  },
  createMessage: function(message) {
    message.id = messageId++;
    messages.push(message);
  },
  getMessages: function() {
    return messages;
  },
  clearMessages: function() {
    messages.length = 0;
    messageId = 0;
  },
  getTweets: function() {
    return tweets;
  },
  getCats: function() {
    return cats;
  },
  getDogs: function() {
    return dogs;
  },
  getGifs: function() {
    return gifs;
  }
};
