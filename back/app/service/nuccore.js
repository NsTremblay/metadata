
var request = require('request');
var xml2js = require('xml2js');


exports.getMetaDataFromNuccore = function(accession){


    
    function getMetaDataFromNuccore(accession){
        return request.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&rettype=native&retmode=xml&id="+accession);
    }

}

function seqInformation(sequence){
    var seqInfo = {};
    for (var element in sequence){
        seqInfo[element.replace("GBSeq_","")] = sequence[element];
    }
    return seqInfo;
}

function getMainMetadata(crude){

    var refined  = [];

    //loop through all of the GBSeq and try to get everything
    for(var i = 0; i<crude['GBSet']['GBSeq'].length; i++){
        refined.push(seqInformation(crude['GBSet']['GBSeq'][i]));
    }

    return refined || {};
}

exports.fromXML2js = function (response){
    
    var filteredResults = getMainMetadata(response);
    return filteredResults;

}

exports.mapMeta = function (genome){


    return "";
}