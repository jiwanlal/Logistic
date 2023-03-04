import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessesService {

  private readonly API_URL = environment.apiUrl
 

  constructor(public http: HttpClient) {
    
   }

  getbranchlist() {
    const url = this.API_URL + environment.branch
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }

  public branchpost(Body): Observable<any> {
    const url = this.API_URL + environment.branch
    return this.http.post<any>(url, Body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public branchput(id: number, data: any): Observable<any> {
    const url = this.API_URL + environment.branch + `/${id}`;
    console.log(url)
    return this.http.put<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public branchdelete(id: number): Observable<any> {
    const url = this.API_URL + environment.branch + `/${id}`;
    console.log(url)
    return this.http.delete<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  // branch api end
  getbusinesslist() {
    const url = this.API_URL + environment.business
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }

  public businesspost(Body): Observable<any> {
    const url = this.API_URL + environment.business
    return this.http.post<any>(url, Body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public businessput(id: number, data: any): Observable<any> {
    const url = this.API_URL + environment.business + `/${id}`;
    console.log(url)
    return this.http.put<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  
  public businessdelete(id: number): Observable<any> {
    const url = this.API_URL + environment.business + `/${id}`;
    console.log(url)
    return this.http.delete<any>(url)
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
