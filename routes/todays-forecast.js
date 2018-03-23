var express = require("express");
var router = express.Router();

var getWeather = require("../data").getWeather;

router.get("/", function(req, res) {
  res.json({
    high: getWeather().forecast.simpleforecast.forecastday[0].high.fahrenheit,
    low: getWeather().forecast.simpleforecast.forecastday[0].low.fahrenheit,
    conditions: getWeather().forecast.simpleforecast.forecastday[0].conditions,
    icon: getWeather().forecast.simpleforecast.forecastday[0].icon_url
  });
});

module.exports = router;
