var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{first: 'Nick', last: "Volpe"}, {first: 'Jenna', last: "Van Conett"}, {first: 'Rafi', last: "Patel"}]);
});

module.exports = router;
