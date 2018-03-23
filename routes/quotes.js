var express = require("express");
var router = express.Router();

var quotes = require("../data").quotes;

// GET QUOTES
router.get("/", function(req, res) {
  if (req.query.q) {
    var newQuotes = [];
    quotes.forEach(function(quote) {
      if (quote.text.includes(req.query.q)) {
        newQuotes.push(quote);
      }
    });
    res.json(newQuotes);
  } else {
    res.json(quotes);
  }
});

// GET RANDOM QUOTE
router.get("/random", function(req, res) {
  res.json(quotes[Math.floor(Math.random() * 10)]);
});

// GET QUOTE BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(quotes[req.params.id]);
  } else {
    var err = new Error("You must have a valid Quote ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
