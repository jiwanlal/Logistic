import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { countrydatamodal } from './location.modal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
    private readonly API_URL = environment.apiUrl
  itema = []

  constructor(public http: HttpClient) {
    
   }

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
// Country api call end/////

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
  // Zone api call end
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
// Region api call end
  
  public statelist() {
    const url = this.API_URL + environment.state
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public statepost(data): Observable<any> {
    const url = this.API_URL + environment.state
    return this.http.post<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public stateput(id: number, data: any): Observable<any> {
    const url = this.API_URL + environment.state + `/${id}`;
    console.log(url)
    return this.http.put<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public statedelete(id: number): Observable<any> {
    const url = this.API_URL + environment.state + `/${id}`;
    console.log(url)
    return this.http.delete<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  // state Api call end////
  public citylist() {
    const url = this.API_URL + environment.city
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public citypost(data): Observable<any> {
    const url = this.API_URL + environment.city
    return this.http.post<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public cityput(id: number, data: any): Observable<any> {
    const url = this.API_URL + environment.city + `/${id}`;
    console.log(url)
    return this.http.put<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public citydelete(id: number): Observable<any> {
    const url = this.API_URL + environment.city + `/${id}`;
    console.log(url)
    return this.http.delete<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  // city Api call end////
  public postcodelist() {
    const url = this.API_URL + environment.postcode
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public postcodepost(data): Observable<any> {
    const url = this.API_URL + environment.postcode
    return this.http.post<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public postcodeput(id: number, data: any): Observable<any> {
    const url = this.API_URL + environment.postcode + `/${id}`;
    console.log(url)
    return this.http.put<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public postcodedelete(id: number): Observable<any> {
    const url = this.API_URL + environment.postcode + `/${id}`;
    console.log(url)
    return this.http.delete<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  // city Api call end////
  public  localitylist() {
    const url = this.API_URL + environment.locality
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public localitypost(data): Observable<any> {
    const url = this.API_URL + environment.locality
    return this.http.post<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public localityput(id: number, data: any): Observable<any> {
    const url = this.API_URL + environment.locality + `/${id}`;
    console.log(url)
    return this.http.put<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public localitydelete(id: number): Observable<any> {
    const url = this.API_URL + environment.locality + `/${id}`;
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