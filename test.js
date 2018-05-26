

var nodemailer = require('nodemailer');
var hbs=require("nodemailer-express-handlebars")


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


var mailOptions = {
  from: 'noreply@stepin.co.il',
  to: "razuahammed@icloud.com",
  subject:"Razu"+",הטבת 10% הנחה, במיוחד בשבילך !! פרסומת",
  template: "email",
  context: {
  	coupon:"123456791",
    userName: "Razu"
  }
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
