var express = require('express');
var Genome = require('../models/genome');
var nuccore = require('../service/nuccore');
var rp = require('request-promise');
var xml2js = require('xml2js');
module.exports = (function () {
    'use strict';
    var router = express.Router();

    // middleware to use for all requests
    router.use(function (req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

    // on routes that end in /user
    // ----------------------------------------------------
    router.route('/genome')

        // get all the genomes that are listed in the 
        .post(function (req, res) {

            var genome = new Genome();      // create a new instance of the user model
            user.username = req.body.username;  // set the users username (comes from the request)
            req.body.listAccession;
            var accessions = req.body.accessions;

            var response = [];

            for (var i = 0; i < accessions.length; i++) {
                Genome.findOne({ accession: accessions[i] }, function (err, doc) {
                    // doc is a Document
                    if (!doc) {
                        // save the user and check for errors
                        response.push(doc);
                    } else {
                        response.push({ status: "nogenome" });
                    }
                })
            }
            req.json(req);
        })

    // on routes that end in /genome/accesssion 
    // ----------------------------------------------------
    router.route('/genome/:accession')

        // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
        .get(function (req, res) {
            Genome.findById(req.params.accession, function (err, genome) {

                if (!genome) {
                    console.log("Get : " + req.params.accession + " from nuccore");
                    //this genome is not in the database and should be added
                    rp.get("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=" + req.params.accession + "&rettype=gb&retmode=xml")
                        .then(function (result) {
                            //var meta = nuccore.fromXML2js(result);

                            var parseString = xml2js.parseString;
                            var xml = result;

                            parseString(xml, function (err, result) {
                                var jsonString = JSON.stringify(nuccore.fromXML2js(result));
                                console.log(jsonString);
                                res.json(jsonString);
                            });
                            
                            
                        });
                } else {
                    res.json(doc);
                }

                if (err)
                    res.send(err);

            });
        })


    return router;
})();




