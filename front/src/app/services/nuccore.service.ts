import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


const resourceURL :string = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&rettype=native&retmode=xml&id=";


@Injectable()
export class NuccoreService {


  constructor(private http:Http) { }

   // Fetch all existing comments
  getAccession(accession:string) : Observable<Object>{
         // ...using get request
         return this.http.get(resourceURL+accession)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.text())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }




}
