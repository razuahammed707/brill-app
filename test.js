


console.log("You already got the coupon")

      //var message = req.body.FirstName+", תודה על הרשמתך !! להזכירך, קוד הטבת 10% הנחה:("+result.coupon+"), למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין, כל נעל סנטר ושואו-אופ. עד 31.5.18, כפוף לתנאי המבצעים, להסרה השב הסר";
    //    var message = req.body.FirstName+", תודה על הרשמתך  להזכירך, קוד הטבת 10% הנחה:("+result.coupon+"), למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין, כל נעל סנטר ושואו-אופ. עד 30.5.18, כפוף לתנאי המבצעים, להסרה השב הסר";


      var message =req.body.FirstName+", תודה על הרשמתך !! להזכירך, קוד הטבת 10% הנחה: ("+result.coupon+"), למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין ושואו-אופ. עד 30.6.18, כפוף לתנאי המבצעים, להסרה השב הסר";
      console.log(message);



            //Send sms

                      var message= req.body.FirstName+", תודה על הרשמתך !! קוד הטבת 10% הנחה: ("+result.coupon+"), למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין ושואו-אופ. עד 30.6.18, כפוף לתנאי המבצעים, להסרה השב הסר"
                      //  var message = req.body.FirstName+", תודה על הרשמתך !! קוד הטבת 10% הנחה: ( "+couponId+" ), למימוש חד פעמי באחת מהרשתות: גלי, סולוג, לי קופר, ניין ווסט, איזי ספיריט, אן קליין, כל נעל סנטר ושואו-אופ. עד 30.5.18, כפוף לתנאי המבצעים, להסרה השב הסר";
                        console.log("New Message"+message);




                                request.post({url:'http://www.pages02.net/nessatltd-brill/iframeWS', form: {fn:req.body.FirstName,ln:req.body.LastName,phone:req.body.telephone,email:req.body.email,nl:"1",cpn:result.coupon,med:"sms",src:'קמפיין השקה'}}, function(err,httpResponse,body){ 
              	console.log("Sent to watson "+httpResponse)
              	//console.log(body)
              })