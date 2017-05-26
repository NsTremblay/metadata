import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
const resourceURL :string = "http://localhost:8080/genome/";

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GenomesService {

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
