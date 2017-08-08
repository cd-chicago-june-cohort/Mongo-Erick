var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
mongoose.connect('mongodb://localhost/MongooseDashboardDB');

var OtterSchema = new mongoose.Schema({
    name: String,
    animal: String,
    time: Date
})

mongoose.model('Otter', OtterSchema);
var Otter = mongoose.model('Otter');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    Otter.find({}, function(err, otters){
        if(err) {
        console.log('something went wrong');
        } else { 
        console.log('successfully retrieved all otters!');
        res.render("index", {'otters': otters});
        }
    })
})

app.get('/new', function(req, res) {
    res.render("addOtter");
})

app.get('/destroy/:id', function(req, res){
    console.log(req.params.id);
     Otter.remove({_id: req.params.id}, function(err){
        if(err) {
        console.log('something went wrong');
        } else { 
        console.log('successfully removed otter!');
        res.redirect('/');
        }
    })
})

app.get('/edit/:id', function(req, res){
    console.log(req.params.id);
     Otter.find({_id: req.params.id}, function(err, otter){
        if(err) {
        console.log('something went wrong');
        } else { 
        console.log('successfully edited otter!');
        console.log(otter);
        res.render('edit', {'otter':otter});
        }
    })
})

app.get('/:id', function(req, res){
     Otter.find({_id: req.params.id}, function(err, otter){
        if(err) {
        console.log('something went wrong');
        } else { 
        console.log('successfully got otter!');
        res.render('otter', {'otter':otter});
        }
    })
})

app.post('/process', function(req, res) {
    if(req.body.update){
        Otter.update({_id:req.body.id}, {$set: {name:req.body.name, animal:req.body.animal}}, function(err){
            if(err) {
            console.log('something went wrong');
            } else { 
            console.log('successfully edited otter!');
            res.redirect('/');
            }
        })
    }else{
        var date = new Date();
        var newOtter = new Otter({name: req.body.name, animal: req.body.animal, time:date});
        newOtter.save(function(err) {
            if(err) {
            console.log('something went wrong');
            } else { 
            console.log('successfully added a otter!');
            res.redirect('/');
            }
        })
    }
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});