var express = require("express");
var router = express.Router();

var showTitles = require("../data").showTitles;

// GET SHOW TITLES
router.get("/", function(req, res) {
  res.json(showTitles);
});

// GET RANDOM SHOW TITLE
router.get("/random", function(req, res) {
  res.json(showTitles[Math.floor(Math.random() * 10)]);
});

// GET SHOW TITLE BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(showTitles[req.params.id]);
  } else {
    var err = new Error("You must have a valid Show ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
