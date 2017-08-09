var mongoose = require('mongoose');
var Otter = mongoose.model('Otter');

module.exports = {
    show: function (req, res) {
        Otter.find({}, function (err, otters) {
            if (err) {
                console.log('something went wrong');
            } else {
                console.log('successfully retrieved all otters!');
                res.render("index", { 'otters': otters });
            }
        })
    },
    destroy: function (req, res) {
        Otter.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log('something went wrong');
            } else {
                console.log('successfully removed otter!');
                res.redirect('/');
            }
        })
    },
    edit: function (req, res) {
        Otter.find({ _id: req.params.id }, function (err, otter) {
            if (err) {
                console.log('something went wrong');
            } else {
                console.log('successfully edited otter!');
                console.log(otter);
                res.render('edit', { 'otter': otter });
            }
        })
    },
    update: function (req, res) {
        if (req.body.update) {
            Otter.update({ _id: req.body.id }, { $set: { name: req.body.name, animal: req.body.animal } }, function (err) {
                if (err) {
                    console.log('something went wrong');
                } else {
                    console.log('successfully edited otter!');
                    res.redirect('/');
                }
            })
        } else {
            var date = new Date();
            var newOtter = new Otter({ name: req.body.name, animal: req.body.animal, time: date });
            newOtter.save(function (err) {
                if (err) {
                    console.log('something went wrong');
                } else {
                    console.log('successfully added a otter!');
                    res.redirect('/');
                }
            })
        }
    },
    unique: function(req, res){
        Otter.find({ _id: req.params.id }, function (err, otter) {
            if (err) {
                console.log('something went wrong');
            } else {
                console.log('successfully got otter!');
                res.render('otter', { 'otter': otter });
            }
        })
    }
}