var express = require("express");
var router = express.Router();
var moment = require("moment");

var getMessages = require("../data").getMessages;
var createMessage = require("../data").createMessage;

// GET MESSAGES
router.get("/", function(req, res) {
  var newMessages = getMessages().reverse();
  res.json(newMessages);
});

// POST A NEW MESSAGE
router.post("/", function(req, res, next) {
  var date = new Date();
  var author = "Unknown";
  if (req.body.author) {
    author = req.body.author;
  }
  if (req.body.text) {
    createMessage({
      text: req.body.text,
      date: moment(date).format("LLLL"),
      author: author
    });
    res.status(201).send("");
  } else {
    var err = new Error("You must add text to your message.");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
