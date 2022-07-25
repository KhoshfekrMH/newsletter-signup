const express = require('express');
const bodyParser = require('body-parser');
/*const axios = require('axios');*/

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get("/", function (req,res) {
   res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function (req,res) {
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let email = req.body.email;

   res.send("complete");
   console.log(firstName , lastName, email);
});

app.listen(3000 , function () {
   console.log("Server is running on port 3000");
});