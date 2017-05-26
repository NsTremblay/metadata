var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GenomeSchema   = new Schema({
    accession: String,
    metadata: Object
});

module.exports = mongoose.model('Genome', GenomeSchema);