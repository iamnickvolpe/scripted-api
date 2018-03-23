var express = require("express");
var router = express.Router();

var getDogs = require("../data").getDogs;

// GET DOGS
router.get("/", function(req, res) {
  res.json(getDogs());
});

// GET RANDOM DOG
router.get("/random", function(req, res) {
  res.json(getDogs()[Math.floor(Math.random() * 10)]);
});

// GET DOG BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(getDogs()[req.params.id]);
  } else {
    var err = new Error("You must have a valid Dog ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
