var express = require('express');
var router = express.Router();
var request = require('request');
var mongodb = require("mongodb");
var nodemailer = require('nodemailer');
var hbs=require("nodemailer-express-handlebars")

var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/liron";
var url = "mongodb://razu:munna707@ds239439.mlab.com:39439/liron"

var request = require("request");



// Email Setup


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'razuahammed.lpu@gmail.com',
    pass: '^Munna^%707'
  }
});


transporter.use('compile',hbs({
	viewPath: 'views',
	extName:".hbs"
}));


///email






/* GET home page. */
router.get('/', function(req, res, next) {





  var message = {}
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("liron");
  dbo.collection("coupon").findOne({"bookStatus":false}, function(err, result) {
    if (err) throw err;
      if(result==null){
        res.render('index',{"coupon":false});
      }else{

        res.render('index',{"coupon":true});
      }

    db.close();
  });
});







});

router.post('/', function(req, res, next) {

  console.log("Hello")
  console.log(req.body)


  var telephone = req.body.telephone;
  telephone= telephone.replace(/^0+/, '');
  console.log(telephone);
  var userPhone = "972"+telephone;
  console.log("user Phone"+userPhone);



    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("liron");
    dbo.collection("customers").findOne({"telephone":req.body.telephone}, function(err, result) {
      res.render("thankyou")

      if (err) throw err;
      console.log(result);

      if(result){
        console.log("You already got the coupon")

      //var message = req.body.FirstName+", תודה על הרשמתך !! להזכירך, קוד הטבת 10% הנחה:("+result.coupon+"), למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין, כל נעל סנטר ושואו-אופ. עד 31.5.18, כפוף לתנאי המבצעים, להסרה השב הסר";
      //  var message = req.body.FirstName+", תודה על הרשמתך  להזכירך, קוד הטבת 10% הנחה:("+result.coupon+"), למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין, כל נעל סנטר ושואו-אופ. עד 30.5.18, כפוף לתנאי המבצעים, להסרה השב הסר";
         var message =req.body.FirstName+", תודה על הרשמתך !! להזכירך, קוד הטבת 10% הנחה: ("+result.coupon+"), למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין ושואו-אופ. עד 30.6.18, כפוף לתנאי המבצעים, להסרה השב הסר";
         console.log(message);

      var data = '<?xml version="1.0" encoding="UTF-8"?><sms><account><id>gali85</id> <password>gali713</password></account> <attributes><reference>123</reference><replyPath>0508085969</replyPath> </attributes><schedule> <relative>0</relative></schedule> <targets><cellphone reference="3542">'+userPhone+'</cellphone> </targets><data>'+message+'</data></sms>'



      request.post(
                {url:'http://api.soprano.co.il/',
                body : data,
                headers: {'Content-Type': 'text/xml'}
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body)
                    }
                }
            );


      }

      console.log(result)

  /* Start New Copon*/

      if(result===null){
        dbo.collection("coupon").findOne({"bookStatus":false}, function(err, coupon) {
          if (err) throw err;


            console.log("DataFinsihed"+coupon);

            if(coupon!=null){


                          var couponId = coupon.couponNo;
                          MongoClient.connect(url, function(err, db) {
                          if (err) throw err;
                          var dbo = db.db("liron");
                          var myobj = req.body;
                          myobj.coupon = couponId;


                          dbo.collection("customers").insertOne(myobj, function(err, res) {
                            if (err) throw err;

                            db.close();
                          });


                        });

                        MongoClient.connect(url, function(err, db) {
                          if (err) throw err;
                          var dbo = db.db("liron");
                          var myquery = { couponNo: couponId };
                          var newvalues = { $set: {bookStatus:true} };
                          dbo.collection("coupon").updateOne(myquery, newvalues, function(err, res) {
                            if (err) throw err;
                            console.log("1 document updated");
                            db.close();
                          });
                        });


                        console.log("Mail portion"+req.body.FirstName)

                      // send email
                      var mailOptions = {
                        from: 'noreply@stepin.co.il',
                        to: req.body.email,
                        subject:req.body.FirstName +",הטבת 10% הנחה, במיוחד בשבילך !! פרסומת",
                        template: "email",
                        context: {
                        	coupon:couponId,                        }
                      };


                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });





                      //Send sms



                        var message= req.body.FirstName+", תודה על הרשמתך !! קוד הטבת 10% הנחה: ("+couponId+"), למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין ושואו-אופ. עד 30.6.18, כפוף לתנאי המבצעים, להסרה השב הסר"
                    //  var message = req.body.FirstName+", תודה על הרשמתך !! קוד הטבת 10% הנחה: ( "+couponId+" ), למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין, כל נעל סנטר ושואו-אופ. עד 30.5.18, כפוף לתנאי המבצעים, להסרה השב הסר";
                      console.log("New Message"+message);




                        var data = '<?xml version="1.0" encoding="UTF-8"?><sms><account><id>gali85</id> <password>gali713</password></account> <attributes><reference>123</reference><replyPath>0508085969</replyPath> </attributes><schedule> <relative>0</relative></schedule> <targets><cellphone reference="3542">'+userPhone+'</cellphone> </targets><data>'+message+'</data></sms>'



                        request.post(
                      {url:'http://api.soprano.co.il/',
                      body : data,
                      headers: {'Content-Type': 'text/xml'}
                      },
                      function (error, response, body) {
                          if (!error && response.statusCode == 200) {
                              console.log(body)
                          }
                      }
                  );







            }else{

              res.render("couponfinish");
              console.log("opps sorry we are out of copoun");

              MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("liron");
                var myobj = req.body;
                dbo.collection("newCustomer").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });
              });



            }







          db.close();
        });









      }

/* End New Copon*/









      db.close();
    });
  });




});



module.exports = router;
