var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Label        = require('../models/label');
//let's make a fields schema that will try to map random entries to standardized entries
var FieldSchema   = new Schema({
    name: String,
    values: [{ type: Schema.Types.ObjectId, ref: 'Label' }]
});

module.exports = mongoose.model('Field', FieldSchema);