var express = require("express");
var router = express.Router();

var getGifs = require("../data").getGifs;

// GET GIFS
router.get("/", function(req, res) {
  res.json(getGifs());
});

// GET RANDOM GIF
router.get("/random", function(req, res) {
  res.json(getGifs()[Math.floor(Math.random() * 10)]);
});

// GET GIF BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(getGifs()[req.params.id]);
  } else {
    var err = new Error("You must have a valid GIF ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
