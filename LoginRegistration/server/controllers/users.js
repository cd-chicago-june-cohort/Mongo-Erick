var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    show: function (req, res) {
        res.render('index', {'error':req.session.error});
    },
    register: function (req, res) {
        var newUser = new User({ email: req.body.email, first_name: req.body.firstName, last_name: req.body.lastName, pass_word: req.body.password, birthday: req.body.birthday });
        newUser.save(function (err) {
            if (err) {
                console.log('something went wrong');
                req.session.error = err;
                res.redirect('/');
            } else {
                console.log('successfully added a new user!');
                res.redirect('/');
            }
        })
    }
}