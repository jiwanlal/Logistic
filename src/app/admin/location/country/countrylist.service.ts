import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { countrydatamodal } from './location.modal';

@Injectable({
  providedIn: 'root'
})
export class CountrylistService {
  private readonly API_URL = "assets/data/countryapi.json";
  itema=[]
 
  constructor(public http:HttpClient) { }

  contrylist(){
    return  this.http.get<any>(this.API_URL)
   .pipe(
     catchError((error: HttpErrorResponse) => {
       return observableThrowError(error.error);
     })
   );
 
   }
   
  public countrypost(getUsersScheduleApiCallBody): Observable<any> {
    console.log(getUsersScheduleApiCallBody)
    return this.http.post<any>(this.API_URL,getUsersScheduleApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
      
  }
}
function observableThrowError(error: any): any {
  throw new Error('Function not implemented.');
}

