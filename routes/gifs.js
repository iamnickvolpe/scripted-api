var express = require("express");
var router = express.Router();

var data = [];
for (var i = 0; i < 10; i++) {
  data.push(process.env.ROOT_URL + "/images/gifs/" + i + ".gif");
}

// GET GIFS
router.get("/", function(req, res) {
  res.json(data);
});

// GET RANDOM GIF
router.get("/random", function(req, res) {
  res.json(
    process.env.ROOT_URL +
      "/images/gifs/" +
      Math.floor(Math.random() * 10) +
      ".gif"
  );
});

// GET GIF BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(process.env.ROOT_URL + "/images/gifs/" + req.params.id + ".gif");
  } else {
    var err = new Error("You must have a valid GIF ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
