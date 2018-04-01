var express = require('express');
var router = express.Router();
var app = express;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({"message": "welcome to the home"})
});

module.exports = router;
