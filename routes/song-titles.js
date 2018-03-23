var express = require("express");
var router = express.Router();

var songTitles = require("../data").songTitles;

// GET SONG TITLES
router.get("/", function(req, res) {
  var data = [];
  var newSongTitles = songTitles;
  if (req.query.sort === "desc") {
    newSongTitles.sort(function(a, b) {
      return b.rank - a.rank;
    });
  } else {
    newSongTitles.sort(function(a, b) {
      return a.rank - b.rank;
    });
  }
  newSongTitles.forEach(function(songTitle) {
    data.push(songTitle);
  });
  res.json(data);
});

// GET RANDOM SONG TITLE
router.get("/random", function(req, res) {
  res.json(songTitles[Math.floor(Math.random() * 10)]);
});

// GET SONG TITLE BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(songTitles[req.params.id]);
  } else {
    var err = new Error("You must have a valid Song ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
