var express = require("express");
var router = express.Router();

var getMessages = require("../data").getMessages;

router.get("/", function(req, res) {
  var data = [];
  var newMessages = getMessages().reverse();
  newMessages.forEach(function(message) {
    data.push(message.text);
  });
  res.json(data);
});

module.exports = router;
