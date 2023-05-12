import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable,throwError as observableThrowError, Subject  } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwbsearchService {
 public abwsearchdata=new BehaviorSubject('')

 private readonly API_URL = environment.apiUrl

  constructor(public http:HttpClient) { }
  awbsearch(id){
    const url = this.API_URL + environment.awbsearch+ `/${id}`;
     return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }
}
