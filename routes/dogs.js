var express = require("express");
var router = express.Router();

var data = [];
for (var i = 0; i < 10; i++) {
  data.push(process.env.ROOT_URL + "/images/dogs/" + i + ".jpg");
}

// GET DOGS
router.get("/", function(req, res) {
  res.json(data);
});

// GET RANDOM DOG
router.get("/random", function(req, res) {
  res.json(
    process.env.ROOT_URL +
      "/images/dogs/" +
      Math.floor(Math.random() * 10) +
      ".jpg"
  );
});

// GET DOG BY ID
router.get("/:id", function(req, res, next) {
  if (req.params.id > -1 && req.params.id < 10) {
    res.json(process.env.ROOT_URL + "/images/dogs/" + req.params.id + ".jpg");
  } else {
    var err = new Error("You must have a valid Dog ID");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
