var express = require('express');
var Genome = require('../models/genome');
var Field = require('../models/field');
var Label = require('../models/label');
var nuccore = require('../service/nuccore');
var rp = require('request-promise');
var xml2js = require('xml2js');
var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
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

    router.route('/genome/all')
        .post(function (req, res) {
            console.log("test");
            console.log(req.body.accessions.length);
            var genomes = [];
            for (var i = 0; i < req.body.accessions.length; i++) {
                genomes.push(new Promise((resolve, reject) => {
                    Genome.find({ accession: req.body.accessions[i] }, function (err, genome) {

                        if (genome.length == 0) {
                            console.log("Get : " + req.params.accession + " from nuccore");
                            //this genome is not in the database and should be added
                            rp.get("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=" + req.params.accession + "&rettype=gb&retmode=xml")
                                .then(function (result) {
                                    //var meta = nuccore.fromXML2js(result);

                                    var parseString = xml2js.parseString;
                                    var xml = result;

                                    parseString(xml, function (err, result) {
                                        console.log(result);
                                        var jsonString = JSON.stringify(nuccore.fromXML2js(result));
                                        console.log(jsonString);

                                        //let's create the genome in the database
                                        var gen = new Genome();
                                        gen.accession = req.params.accession;
                                        gen.rawMetadata = nuccore.fromXML2js(result);
                                        gen.save();
                                        resolve(gen);
                                    });
                                });
                        } else {
                            resolve(genome);
                        }

                        if (err)
                            res.send(err);
                    });
                }))

            }


            Promise.all(genomes)
                .then(array => {
                    console.log("Send back "+array.length);
                    res.json(array);
                });
            
        });

    // on routes that end in /genome/accesssion 
    // ----------------------------------------------------
    router.route('/genome/:accession')

        // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
        .get(function (req, res) {

            Genome.find({ accession: req.params.accession }, function (err, genome) {
                console.log(genome);
                if (genome.length == 0) {
                    console.log("Get : " + req.params.accession + " from nuccore");
                    //this genome is not in the database and should be added
                    rp.get("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=" + req.params.accession + "&rettype=gb&retmode=xml")
                        .then(function (result) {
                            //var meta = nuccore.fromXML2js(result);

                            var parseString = xml2js.parseString;
                            var xml = result;

                            parseString(xml, function (err, result) {
                                console.log(result);
                                var jsonString = JSON.stringify(nuccore.fromXML2js(result));
                                console.log(jsonString);

                                //let's create the genome in the database
                                var gen = new Genome();
                                gen.accession = req.params.accession;
                                gen.rawMetadata = nuccore.fromXML2js(result);
                                gen.save();
                                res.json(gen);
                            });
                        });
                } else {
                    res.json(genome);
                }

                if (err)
                    res.send(err);
            });
        })
        .post(function (req, res) {
            //add information about the accession
            Genome.findById({ _id: req.param._id }, function (err, genome) {
                console.log(genome);
            });
        });


    router.route('/fields')
        .get(function (req, res) {
            Field.find({}, function (err, fields) {
                console.log();
            });
        })
        .post(function (req, res) {
            //ammend a change to a field
            Field.find({}, function (err, fields) {
                console.log();
            });
        });

    router.route('/labels')
        .get(function (req, res) {
            Label.find({}, function (err, labels) {
                console.log(labels);
                res.json(labels);
            });
        })
        .post(function (req, res) {
            //ammend a change to a field
            console.log(req.body);
            var labelTmp = new Label();
            labelTmp.name = req.body.name;
            labelTmp.value = req.body.value;
            labelTmp.save();
            res.json({ message: "savedLabel" })
        });


    return router;
})();




