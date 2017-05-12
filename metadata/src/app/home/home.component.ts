import { Component, OnInit } from '@angular/core';
import {NuccoreService} from '../services/nuccore.service'

import {xml2js} from 'xml2js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accessions:string = `AMVJ00000000.1 
AMVK00000000.1
JFBE00000000.1
AFPS00000000.1
JFGU00000000.1
JHOA00000000.1
JHNZ00000000.1
JHNY00000000.1
JHNX00000000.1
JHNW00000000.1
JHNV00000000.1`

  constructor(private nuccore: NuccoreService) { }

  ngOnInit() {
  }

  //go gets the accessions and the metadata information
  //checkout the sqlite database to see if this accessions was filtered previously
  extractAccessions(){
    //break down the accessions and validate
    let accessions :string [] = this.accessions.match(/[a-zA-Z]+[0-9]+\.*[0-9]*/g)
    accessions.forEach(element => {
      this.nuccore.getAccession(element).subscribe(
                               meta => {
                                 
                                 console.log(xml2js.xml2js(meta, {compact: true, spaces: 4}));
                                 
                               }, //Bind to view
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });
      console.log(element);
    });
  }

}
