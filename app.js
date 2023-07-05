//jshint esversion:6

const express = require("express");

const app = express();
const https = require("https");
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                FNAME: firstname,
                LNAME: lastname
                }
            }
        ]
    };

    const jsondata = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/dbd1eacddc";
    const options = {
        method: "POST",
        auth: "rakes:761d8ba1fe726fbcbc6558303b9a2f0e-us21"
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
    })
    request.write(jsondata);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000 , function(){
    console.log("Server Started at 3000");
});


//apikey
//bbee6d1a8087aef953884ea92b59db22-us21

// listid dbd1eacddc