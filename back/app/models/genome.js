var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Label        = require('../models/label');
//genome schema

var GenomeSchema   = new Schema({
    accession: String,
    rawMetadata: Object,
    refinedMetadata: [{ type: Schema.Types.ObjectId, ref: 'Label' }]
});

module.exports = mongoose.model('Genome', GenomeSchema);

