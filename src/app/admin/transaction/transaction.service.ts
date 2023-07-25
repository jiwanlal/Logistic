import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly API_URL = environment.apiUrl


  constructor(public http:HttpClient) { }
  bugNumber(str){
    const url = this.API_URL + environment.bugnumber +`?query=`+str
   return this.http.get<any>(url)
  }
  getAllbugNumber(){
    const url = this.API_URL + environment.bugnumber
   return this.http.get<any>(url)
  }
 
  public awblist(id: number): Observable<any> {
    const url = this.API_URL + environment.awb + `/${id}`;
    console.log(url)
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  getAllinscanData() {
    const url = this.API_URL + environment.inscan
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }

  public postAllinscanData(Body): Observable<any> {
    const url = this.API_URL + environment.inscan
    return this.http.post<any>(url, Body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public inscanput(id: number,data: any): Observable<any> {
    const url = this.API_URL + environment.inscan+ `/${id}`
    return this.http.put<any>(url,data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public inscandelete(id: number): Observable<any> {
    const url = this.API_URL + environment.inscan + `/${id}`;
    console.log(url)
    return this.http.delete<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  getAlldrsdata() {
    const url = this.API_URL + environment.drs
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  drsofddelete(id: number){
    const url = this.API_URL + environment.drs + `/${id}`
    return this.http.delete<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }
  drsofdput(id: number,data: any){
    const url = this.API_URL + environment.drs+ `/${id}`
    return this.http.put<any>(url,data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  drsofdpost(Body){
    const url = this.API_URL + environment.drs
    return this.http.post<any>(url, Body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }
  getdeliveryboyslist(){
    const url = this.API_URL + environment.deliveryboys
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }
  searchdrsofd(str){
    const url = this.API_URL + environment.drsawb +`?query=`+str
   return this.http.get<any>(url)
  }
  getAlldeliverydata(){
    const url = this.API_URL + environment.delivery
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }

  Alldeliverydataput(id: number,data: any){
    const url = this.API_URL + environment.delivery+ `/${id}`
    return this.http.put<any>(url,data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  Alldeliverydatapost(Body){
    const url = this.API_URL + environment.delivery
    return this.http.post<any>(url, Body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }
  deliverydatadelete(id: number){
    const url = this.API_URL + environment.delivery + `/${id}`
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }
  getdeliveryoffice(){
    const url = this.API_URL + environment.deliveryoffice
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }
   getdeliveryproof(){
    const url = this.API_URL + environment.proof
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }
  getofficeawb(id: number){
    const url = this.API_URL + environment.officeawb + `/${id}`
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }
  getdeliverytabdata(id: number){
    const url = this.API_URL + environment.inscan + `/${id}`
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }
  getdrsforimage(str,type){
    const url = this.API_URL + environment.drsforimage + `/${type}` + `?query=`+str
    return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );
  }
  public drsimagepost(id: number,data: any): Observable<any> {
    const url = this.API_URL + environment.drsimage+ `/${id}`
    return this.http.post<any>(url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error);
        })
      );

  }
  public awbimagepost(drs,ins,data: any): Observable<any> {
    const url = this.API_URL + environment.awbimage+ `/${drs}` + `/${ins}`
    console.log(url)
    return this.http.post<any>(url, data)
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

