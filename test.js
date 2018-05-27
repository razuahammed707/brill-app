var mongodb = require("mongodb");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://razu:munna707@ds239439.mlab.com:39439/liron"



MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("liron");
  var myquery = { bookStatus: true };
  var newvalues = { $set: {bookStatus: false } };
  dbo.collection("coupon").updateMany(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
