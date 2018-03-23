var express = require("express");
var router = express.Router();

var shows = require("../data").shows;

// GET SHOWS
router.get("/", function(req, res) {
  res.json(shows);
});

// GET RANDOM SHOW
router.get("/random", function(req, res) {
  res.json(shows[Math.floor(Math.random() * 10)]);
});

// GET SHOW BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(shows[req.params.id]);
  } else {
    var err = new Error("You must have a valid Show ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
