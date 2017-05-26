
var request = require('request');
var xml2js = require('xml2js');


exports.getMetaDataFromNuccore = function(accession){


    
    function getMetaDataFromNuccore(accession){
        return request.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&rettype=native&retmode=xml&id="+accession);
    }

}

exports.fromXML2js = function (response){
    var parseString = xml2js.parseString;
    var xml = response;
    parseString(xml, function (err, result) {
        console.log(result);
    });
}

exports.mapMeta = function (genome){


    return "";
}