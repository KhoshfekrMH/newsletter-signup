const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const https = require('https');
const mailchimp = require('@mailchimp/mailchimp_marketing');



const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

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
      });
   });

   request.write(jsonData);
   request.end();
});

app.listen(3000 , function () {
   console.log("Server is running on port 3000");
});

//APIkey : 132d9553cf7ba10820d8b6e948d46be7-us14
//List Id : 998d09491b