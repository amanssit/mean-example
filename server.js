var express = require('express');
var mongojs = require('mongojs');
var app = express();
var db = mongojs('parken', ['parken'])
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/view'))
app.use(bodyParser.json())

app.get('/parken', function (req, res) {

    db.parken.find(function (err, doc) {
        res.json(doc);
    })
})
app.get('/parken/:id', function (req, res) {
    var id = req.params.id;
    db.parken.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    })
})
app.post('/parken', function (req, res) {
    console.log('add details');
    var data = req.body;
    console.log(data);
    db.parken.insert(data, function (err, doc) {
        res.json(doc);
    })
})
app.delete('/parken/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.parken.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    })


})
app.put('/parken/:id', function (req, res) {
    var id = req.params.id;
    var contact = req.body;
    console.log(contact);
    console.log(id);
    db.parken.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: contact.name, mobile: contact.mobile, city: contact.city}},
        new: true
    }, function (err, doc) {
        res.json(doc);
    })
})

app.listen(3006);
console.log('listening 3006 port');