// jshint esversion:6


const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
require('dotenv').config();


const https = require('https');
const app = express();

app.get("/",function(request,response)
{
   response.sendFile(__dirname+"/index.html");
});

app.use(bodyparser.urlencoded({extended : true}));
app.post("/",function(req,res)
{
  var name = req.body.name;
  var email = req.body.email;
  var contact = req.body.contact;
  var dob = req.body.dob;
  var bg = req.body.bg;
  var address = req.body.address+" "+req.body.pincode;
  var type = req.body.type

  var data = {

  members : [
    {
      email_address : email,
      status: "subscribed",
      merge_fields : {

        FNAME : name,
        ADDRESS : address,
        PHONE :   contact,
        BLOODGROUP : bg,
        BIRTHDAY : dob,
        RE : type
      }
    }
  ]
  };
  var json_data = JSON.stringify(data);


// const url = "https://us2.api.mailchimp.com/3.0/lists/0004c1be1e";
// const options = {
//   method : "POST",
//   auth : process.env.API_KEY
// };

  const request = https.request(url,options,function(response)
{

  if(response.statusCode === 200)
  {
    res.sendFile(__dirname+"/success.html");
  }

  else{
    res.sendFile(__dirname+"/failure.html");
  }

  response.on("data",function(data)
  {
    console.log(JSON.parse(data));
   });
  });

request.write(json_data);
request.end();

});

app.post("/failure",function(req,res)
{
  res.redirect("/");
});

app.use(express.static("public"));


app.listen(process.env.PORT||3000,function(req,res)
{
  console.log("server up");
});









// 0004c1be1e  list id
// b89577757b72a1be1a9f52f2bd091241-us2 api key
