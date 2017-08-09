var mongoose = require('mongoose');
var Person = mongoose.model('Person');

module.exports = {
    show: function (req, res) {
        Person.find({}, function (err, persons) {
            if (err) {
                console.log('something went wrong');
            } else {
                res.json(persons);
            }
        })
    },
    create: function (req, res) {
        var newPerson = new Person({ name: req.params.name});
        newPerson.save(function (err) {
            if (err) {
                console.log('something went wrong');
            } else {
                console.log('successfully added a person!');
                res.redirect('/');
            }
        })
    },
    remove: function (req, res) {
        Person.remove({name: req.params.name }, function (err) {
            if (err) {
                console.log('something went wrong');
            } else {
                console.log('successfully removed person!');
                res.redirect('/');
            }
        })
    },
    view: function(req, res){
        Person.find({name: req.params.name}, function(err, person){
            if (err) {
                console.log('something went wrong');
            } else {
                res.json(person);
            }
        })
    }
}