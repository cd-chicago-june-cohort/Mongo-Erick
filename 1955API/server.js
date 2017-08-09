var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require("path");

require('./server/config/mongoose.js');

var app = express();
app.use(bodyParser.json());

var route_setter = require('./server/config/routes.js');
route_setter(app);

var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});