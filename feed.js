var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var feed = express()

feed.use(bodyParser.json());
feed.use(express.static('views'));
feed.use(bodyParser.urlencoded({ extended: true }));

var url = "mongodb://localhost:27017/";
var dbo;
MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    dbo = database.db("feedback");
});

feed.post('/main', function(req, res) {
    var name = req.body.Name;
    var email = req.body.Email;
    var number = req.body.Number;
    var review = req.body.Review;
    npm

    var data = {
        "firstname": name,
        "email": email,
        "PhoneNo": number,
        "review": review
    }
    dbo.collection('userfeedback').insertOne(data, function(err, collection) {
        if (err) throw err;

    });
    return res.redirect('main.html');
})

feed.get('/', function(req, res) {
    return res.redirect('main.html');
}).listen(3030)
console.log("Server is listening to port no. 3030");