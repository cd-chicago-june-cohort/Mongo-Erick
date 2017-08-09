var mongoose = require('mongoose');
var Otter = mongoose.model('Otter');
var otters = require('../controllers/otters.js');

module.exports = function (app) {
    app.get('/', function (req, res) {
        otters.show(req, res);
    })

    app.get('/new', function (req, res) {
        res.render("addOtter");
    })

    app.get('/destroy/:id', function (req, res) {
        otters.destroy(req, res);
    })

    app.get('/edit/:id', function (req, res) {
        otters.edit(req, res);
    })

    app.get('/:id', function (req, res) {
        otters.unique(req, res);
    })

    app.post('/process', function (req, res) {
        otters.update(req, res);
    })
}
