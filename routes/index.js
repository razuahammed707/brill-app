var express = require('express');
var router = express.Router();
var request = require('request');


var coupon = 111111111;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');

 console.log(req.body)


});

router.post('/', function(req, res, next) {


	res.render("thankyou",{coupon: coupon})


	res.end();


});

module.exports = router;
