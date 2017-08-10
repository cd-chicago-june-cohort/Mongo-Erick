var mongoose = require('mongoose');
var users = require('../controllers/users.js');

module.exports = function (app) {
    app.get('/', function (req, res) {
        users.show(req, res);
    })

    app.post('/register', function (req, res) {
        users.register(req, res);
    })
}