var express = require("express");
var router = express.Router();
var moment = require('moment');

var getTweets = require("../data").getTweets;

router.get("/", function(req, res) {
  var newTweets = [];
  getTweets().forEach(function(tweet) {
    var image = "";
    if (tweet.entities.media) {
      if (tweet.entities.media[0].type === "photo") {
        image = tweet.entities.media[0].media_url_https;
      }
    }

    newTweets.push({
      text: tweet.text,
      date: moment(tweet.created_at).format("LLLL"),
      author_name: tweet.user.name,
      author_handle: tweet.user.screen_name,
      author_avatar: tweet.user.profile_image_url_https,
      image: image,
      url: "https://www.twitter.com/statuses/" + tweet.id_str
    });
  });
  res.json(newTweets);
});

module.exports = router;
