var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//genome schema
var LabelSchema   = new Schema({
    name: [String],
    value: String
});

module.exports = mongoose.model('Label', LabelSchema);
