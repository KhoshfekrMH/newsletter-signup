const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//#region mainSignPage ("/")
app.get("/", function (req,res) {
   res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function (req,res) {
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const email = req.body.email;

   let data = {
      members: [
         {
            email_address: email,
            status: "subscribed",
            merge_fields:{
               FNAME: firstName,
               LNAME: lastName
            }
         }
      ]
   };

   let jsonData = JSON.stringify(data);

   const url = "https://us14.api.mailchimp.com/3.0/lists/998d09491b"

   const options = {
      method: "POST",
      auth:"brainy2001:132d9553cf7ba10820d8b6e948d46be7-us14"
   }

   const request = https.request(url, options, function (response) {
      response.on("data", function (data) {
         console.log(JSON.parse(data));

         if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
         } else {
            res.sendFile(__dirname + "/failure.html");
         }
      });

   });

   request.write(jsonData);
   request.end();
});
//#endregion

//#region SuccessPage ("/SuccessPage")
app.post("/success", function (req,res) {
   res.redirect("/");
});
//#endregion

//#region FailurePage ("/failure")
app.post("/failure", function (req,res) {
   res.redirect("/")
});
//#endregion

app.listen(process.env.PORT || 3000 , function () {
   console.log("Server is running on port 3000");
});

//APIkey : 132d9553cf7ba10820d8b6e948d46be7-us14
//List Id : 998d09491b