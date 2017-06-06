import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
const resourceURL :string = "http://localhost:8080/api/genome/";

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GenomesService {

  constructor(private http:Http) { }

  genome:object;
  genomes:object[];

  getAccession(accession:string) : Observable<Object>{
         // ...using get request
         return this.http.get(resourceURL+accession)
                        // ...and calling .json() on the response to return data
                         .map(this.extractGenome)
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }

  getAccessions(accessionList:string[]) : Observable<Object[]>{
         // ...using get request
         return this.http.post(resourceURL+"all", {accessions:accessionList} )
                        // ...and calling .json() on the response to return data
                         .map(this.extractGenomes)
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }

  extractGenomes(res:Response){
    
    let jsonL = res.json();
    this.genomes = [];
    for (var index = 0; index < jsonL.length; index++) {
      this.genomes.push(jsonL[index][0]);
    }
    return this.genomes;
  }

  extractGenome(res:Response){
    
    let jsonL = res.json();
    this.genome = jsonL[0];
    return this.genome;
  }

}
