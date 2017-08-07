var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
mongoose.connect('mongodb://localhost/quotes');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String,
    time: Date
})
mongoose.model('Quote',QuoteSchema);
var Quote = mongoose.model('Quote');

app.get('/', function(req, res) {
    res.render("index");
})

app.get('/quotes', function(req, res) {
    Quote.find({}, function(err, quotes){
        if(err) {
        console.log('something went wrong');
        } else { 
        console.log('successfully retrieved all quotes!');
        res.render("quotes", {'quotes': quotes});
        }
    })
})

app.post('/process', function(req, res) {
    var date = new Date();
    var newQuote = new Quote({name: req.body.name, quote: req.body.quote, time:date});
    newQuote.save(function(err) {
        if(err) {
        console.log('something went wrong');
        } else { 
        console.log('successfully added a quote!');
        res.redirect('/quotes');
        }
    })
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});