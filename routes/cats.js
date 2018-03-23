var express = require("express");
var router = express.Router();

var getCats = require("../data").getCats;

// GET CATS
router.get("/", function(req, res) {
  res.json(getCats());
});

// GET RANDOM CAT
router.get("/random", function(req, res) {
  res.json(getCats()[Math.floor(Math.random() * 10)]);
});

// GET CAT BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(getCats()[req.params.id]);
  } else {
    var err = new Error("You must have a valid Cat ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
