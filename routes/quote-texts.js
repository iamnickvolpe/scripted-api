var express = require("express");
var router = express.Router();

var quotes = require("../data").quotes;

// GET QUOTE TEXTS
router.get("/", function(req, res) {
  var newQuotes = [];
  if (req.query.q) {
    quotes.forEach(function(quote) {
      if (quote.text.includes(req.query.q)) {
        newQuotes.push(quote.text);
      }
    });
  } else {
    quotes.forEach(function(quote) {
      newQuotes.push(quote.text);
    });
  }
  res.json(newQuotes);
});

// GET RANDOM QUOTE TEXT
router.get("/random", function(req, res) {
  res.json(quotes[Math.floor(Math.random() * 10)].text);
});

// GET QUOTE TEXTS BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(quotes[req.params.id].text);
  } else {
    var err = new Error("You must have a valid Quote ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
