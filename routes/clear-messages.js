var express = require("express");
var router = express.Router();

var clearMessages = require("../data").clearMessages;

router.get("/", function(req, res) {
  clearMessages();
  res.status(201).send("");
});

module.exports = router;