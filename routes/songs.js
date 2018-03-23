var express = require("express");
var router = express.Router();

var songs = require("../data").songs;

// GET SONGS
router.get("/", function(req, res) {
  var newSongs = songs;
  if (req.query.sort === "desc") {
    newSongs.sort(function(a, b) {
      return b.rank - a.rank;
    });
  } else {
    newSongs.sort(function(a, b) {
      return a.rank - b.rank;
    });
  }
  res.json(newSongs);
});

// GET RANDOM SONG
router.get("/random", function(req, res) {
  res.json(songs[Math.floor(Math.random() * 10)]);
});

// GET SONG BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(songs[req.params.id]);
  } else {
    var err = new Error("You must have a valid Song ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
