var mongoose = require('mongoose');

var OtterSchema = new mongoose.Schema({
    name: String,
    animal: String,
    time: Date
})

mongoose.model('Otter', OtterSchema);
var Otter = mongoose.model('Otter');