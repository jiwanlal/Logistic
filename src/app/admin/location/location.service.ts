import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { countrydatamodal } from './country/location.modal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
    private readonly API_URL = environment.apiUrl
  itema = []

  constructor(public http: HttpClient) { }

  contrylist() {
    const url = this.API_URL + environment.countery
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }

  public countrypost(getUsersScheduleApiCallBody): Observable<any> {
    const url = this.API_URL + environment.countery
    return this.http.post<any>(url, getUsersScheduleApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public countryput(id: number, data: any): Observable<any> {
    const url = this.API_URL + environment.countery + `/${id}`;
    console.log(url)
    return this.http.put<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public countrydelete(id: number): Observable<any> {
    const url = this.API_URL + environment.countery + `/${id}`;
    console.log(url)
    return this.http.delete<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }

  public zonelist() {
    const url = this.API_URL + environment.zone
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public zonepost(getUsersScheduleApiCallBody): Observable<any> {
    const url = this.API_URL + environment.zone
    return this.http.post<any>(url, getUsersScheduleApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public zoneput(id: number, data: any): Observable<any> {
    const url = this.API_URL + environment.zone + `/${id}`;
    console.log(url)
    return this.http.put<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public zonedelete(id: number): Observable<any> {
    const url = this.API_URL + environment.zone + `/${id}`;
    console.log(url)
    return this.http.delete<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public regionlist() {
    const url = this.API_URL + environment.region
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public regionpost(data): Observable<any> {
    const url = this.API_URL + environment.region
    return this.http.post<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public regionput(id: number, data: any): Observable<any> {
    const url = this.API_URL + environment.region + `/${id}`;
    console.log(url)
    return this.http.put<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public regiondelete(id: number): Observable<any> {
    const url = this.API_URL + environment.region + `/${id}`;
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