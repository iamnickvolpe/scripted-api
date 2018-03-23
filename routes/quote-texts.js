var express = require("express");
var router = express.Router();

var quoteTexts = require("../data").quoteTexts;

// GET QUOTE TEXTS
router.get("/", function(req, res) {
  if (req.query.q) {
    var newQuoteTexts = [];
    quoteTexts.forEach(function(quoteText) {
      if (quoteText.includes(req.query.q)) {
        newQuoteTexts.push(quoteText);
      }
    });
    res.json(newQuoteTexts);
  } else {
    res.json(quoteTexts);
  }
});

// GET RANDOM QUOTE TEXT
router.get("/random", function(req, res) {
  res.json(quoteTexts[Math.floor(Math.random() * 10)]);
});

// GET QUOTE TEXTS BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(quoteTexts[req.params.id]);
  } else {
    var err = new Error("You must have a valid Quote ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
