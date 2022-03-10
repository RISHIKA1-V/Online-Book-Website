var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express()

app.use(bodyParser.json());
app.use(express.static('views'));

app.use(bodyParser.urlencoded({ extended: true }));

var url = "mongodb://localhost:27017/";
var dbo;
MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    dbo = database.db("userlogin");
});

app.post('/main', function(req, res) {
    var Name = req.body.firstname;
    var Email = req.body.email;

    var Password = req.body.psw;
    var ConfirmPassord = req.body.psw1;

    var data = {
        "Name": Name,
        "Email": Email,

        "Password": Password,
        "Confirm Password": ConfirmPassord,

    }
    dbo.collection('User').insertOne(data, function(err, collection) {
        if (err) throw err;

    });
    return res.redirect('main.html');
})

app.get('/', function(req, res) {
    return res.redirect('login.html');
}).listen(3000)
console.log("Server is listening to port no. 3000");