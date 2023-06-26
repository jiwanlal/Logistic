import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TreeTarriffsService {
  private readonly API_URL = environment.apiUrl


  constructor(public http: HttpClient) { }

  public loctarfpost(Body): Observable<any> {
    const url = this.API_URL + environment.loctarf
    return this.http.post<any>(url, Body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  getloctarflist() {
    const url = this.API_URL + environment.loctarf
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public loctarput(id: number, data: any): Observable<any> {
    const url = this.API_URL + environment.loctarf + `/${id}`;
    console.log(url)
    return this.http.put<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public loctardelete(id: number): Observable<any> {
    const url = this.API_URL + environment.loctarf + `/${id}`;
    console.log(url)
    return this.http.delete<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public loctarFillvalues(): Observable<any> {
    const url = this.API_URL + environment.loctarFillvalues;
    console.log(url)
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  getcustomersdata() {
    const url = this.API_URL + environment.customersdata
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  getcustomerslist() {
    const url = this.API_URL + environment.customers
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  getratetarflist() {
    const url = this.API_URL + environment.ratetarf
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public customerpost(Body): Observable<any> {
    const url = this.API_URL + environment.customersdata
    return this.http.post<any>(url, Body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public customerput(id: number,data: any): Observable<any> {
    const url = this.API_URL + environment.customersdata+ `/${id}`
    return this.http.put<any>(url,data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public customerdelete(id: number): Observable<any> {
    const url = this.API_URL + environment.customersdata + `/${id}`;
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
