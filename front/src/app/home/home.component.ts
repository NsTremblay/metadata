import { Component, OnInit } from '@angular/core';
import { NuccoreService } from '../services/nuccore.service'
import { GenomesService } from '../services/genomes.service'

import { xml2js } from 'xml2js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accessions: string = `AMVJ00000000.1 
AMVK00000000.1
JFBE00000000.1
AFPS00000000.1`;

  constructor(private nuccore: NuccoreService, private genome:GenomesService) { 

  }

  ngOnInit() {
  }

  accessionsMeta: object []= [];

  //go gets the accessions and the metadata information
  //checkout the sqlite database to see if this accessions was filtered previously
  extractAccessions() {
    this.accessionsMeta =[];
    //break down the accessions and validate
    let accessions: string[] = this.accessions.match(/[a-zA-Z]+[0-9]+\.*[0-9]*/g)
    
    this.genome.getAccessions(accessions).subscribe(

        meta => {          
          this.accessionsMeta = meta;
        }, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
    
    // accessions.forEach(element => {
    //   this.genome.getAccession(element).subscribe(

    //     meta => {          
    //       this.accessionsMeta.push(meta);
    //     }, //Bind to view
    //     err => {
    //       // Log errors if any
    //       console.log(err);
    //     });

    // });
  }

}
