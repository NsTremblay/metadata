
var request = require('request');
var xml2js = require('xml2js');


exports.getMetaDataFromNuccore = function(accession){


    
    function getMetaDataFromNuccore(accession){
        return request.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&rettype=native&retmode=xml&id="+accession);
    }

}

function seqInformation(sequence){
    var seqInfo =[];
    for (var element in sequence){
        var key = element.replace("GBSeq_","") ;
        var obj = {};
        obj.key = key;
        obj.value = sequence[element][0];

        if(key =='feature-table'){
            var features = sequence[element][0]['GBFeature'][0]['GBFeature_quals'][0]['GBQualifier'];
            // console.log(JSON.stringify(sequence[element][0]['GBFeature'][0]['GBFeature_quals']));
            
            for (var feature in features){
                var obj = {};
                console.log(JSON.stringify(feature));
                obj.key = features[feature]['GBQualifier_name'][0];
                obj.value = features[feature]['GBQualifier_value'][0];
                console.log(JSON.stringify(feature));
                seqInfo.push(obj);
            }
        }else{
            seqInfo.push(obj);
        }
        
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