var express = require("express");
var router = express.Router();

var data = [];
for (var i = 0; i < 10; i++) {
  data.push(process.env.ROOT_URL + "/images/cats/" + i + ".jpg");
}

// GET GIFS
router.get("/", function(req, res) {
  res.json(data);
});

// GET RANDOM CAT
router.get("/random", function(req, res) {
  res.json(
    process.env.ROOT_URL +
      "/images/cats/" +
      Math.floor(Math.random() * 10) +
      ".jpg"
  );
});

// GET CAT BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(process.env.ROOT_URL + "/images/cats/" + req.params.id + ".jpg");
  } else {
    var err = new Error("You must have a valid Cat ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
