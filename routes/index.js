var express = require('express');
var router = express.Router();
var request = require('request');
var mongodb = require("mongodb");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/liron";

var request = require("request");






/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');




});

router.post('/', function(req, res, next) {


    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("liron");
    dbo.collection("customers").findOne({phone:req.body.phone}, function(err, result) {
      if (err) throw err;
      console.log(result);

      if(result){
        console.log("You already got the coupon")
      }

      var message = req.body.FirstName+", תודה על הרשמתך !! להזכירך, קוד הטבת 10% הנחה:"+result.coupon+", למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין, כל נעל סנטר ושואו-אופ. עד 31.5.18, כפוף לתנאי המבצעים, להסרה השב הסר";
      var data = '<?xml version="1.0" encoding="UTF-8"?><sms><account><id>gali85</id> <password>gali713</password></account> <attributes><reference>123</reference><replyPath>0521111111</replyPath> </attributes><schedule> <relative>0</relative></schedule> <targets><cellphone reference="3542">'+req.body.telephone+'</cellphone> </targets><data>'+ message+'</data></sms>'



      request.post({
                  url: 'http://api.soprano.co.il/',
                  form: data
          },
            function (err, httpResponse, body) {
                  console.log(err, body);
           });











      if(result===null){


            MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("liron");
            dbo.collection("coupon").findOne({bookStatus:false}, function(err, result) {

              if (err) throw err;
              console.log();


              var copon_id=result.couponNo;

              MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("liron");
                var myobj = req.body;
                myobj.coupon = copon_id;


                dbo.collection("customers").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });


              });


            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("liron");
              var myquery = { couponNo: copon_id };
              var newvalues = { $set: {bookStatus:true} };
              dbo.collection("coupon").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
              });
            });

            var message = req.body.FirstName+", תודה על הרשמתך !! קוד הטבת 10% הנחה: "+copon_id+", למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין, כל נעל סנטר ושואו-אופ. עד 31.5.18, כפוף לתנאי המבצעים, להסרה השב הסר";
            var data = '<?xml version="1.0" encoding="UTF-8"?><sms><account><id>gali85</id> <password>gali713</password></account> <attributes><reference>123</reference><replyPath>0521111111</replyPath> </attributes><schedule> <relative>0</relative></schedule> <targets><cellphone reference="3542">'+req.body.telephone+'</cellphone> </targets><data>'+ message+'</data></sms>'



            request.post({
                        url: 'http://api.soprano.co.il/',
                        form: data
            },
                  function (err, httpResponse, body) {
                        console.log(err, body);
            });





              db.close();
            });
          });




        //


      }



      db.close();
    });
  });

    res.render("thankyou")


});

module.exports = router;
