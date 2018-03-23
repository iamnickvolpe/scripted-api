var express = require("express");
var router = express.Router();

var getWeather = require("../data").getWeather;

router.get("/", function(req, res) {
  res.json(getWeather().current_observation.temp_f);
});

module.exports = router;