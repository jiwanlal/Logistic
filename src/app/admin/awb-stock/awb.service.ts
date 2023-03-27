import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class AwbService{

private readonly API_URL = environment.apiUrl

constructor(private http:HttpClient){}

// Awb type

addAwbType(awbType,id){
    const url = this.API_URL + environment.awbtype + (id ? "/"+id:'')
    if(id){
        return this.http.put<any>(url,awbType)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return error.error;
          })
        );
    }
    return this.http.post<any>(url,awbType)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return error.error;
        })
      );
}

getAwbFillValues(){
    const url = this.API_URL + environment.awbtypefill ;
    return this.http.get<any>(url);
}
getAwbType(id){
    const url = this.API_URL + environment.awbtype + ( id || "");
    return this.http.get<any>(url);
}

deleteAwbType(id){
    const url = this.API_URL + environment.awbtype + ( id? "/"+id : "");
    return this.http.delete<any>(url);
}

/// Sales

getAwbSalesFillValues(){
    const url = this.API_URL + environment.awbsalesfill ;
    return this.http.get<any>(url);
}

createEditAwbSales(data,id){
    const url = this.API_URL + environment.awbsales +( id?"/"+id:"" );

    if(id){
        return this.http.put<any>(url,data);
    }
    return this.http.post<any>(url,data);
}

getAwbSales(id){
    const url = this.API_URL + environment.awbsales + ( id?"/"+id:"");
    return this.http.get<any>(url);
}

deleteAwbSales(id){
    const url = this.API_URL + environment.awbsales + ( id? "/"+id : "");
    return this.http.delete<any>(url);
}

/// Purchase

getAwbPurchaseFillValues(){
    const url = this.API_URL + environment.awbpurchasefill ;
    return this.http.get<any>(url);
}

addEditAwbPurchase(data,id){
    const url = this.API_URL + environment.awbpurchase +( id?"/"+id:"" );

    if(id){
        return this.http.put<any>(url,data);
    }
    return this.http.post<any>(url,data);
}

getAwbPurchase(id){
    const url = this.API_URL + environment.awbpurchase + ( id?"/"+id:"");
    return this.http.get<any>(url);
}

deleteAwbPurchase(id){
    const url = this.API_URL + environment.awbpurchase + ( id? "/"+id : "");
    return this.http.delete<any>(url);
}

// issue
getAwbissueFillValues(){
    const url = this.API_URL + environment.awbissuefill ;
    return this.http.get<any>(url);
}

addEditAwbIssue(data,id){
    const url = this.API_URL + environment.awbissue +( id?"/"+id:"" );

    if(id){
        return this.http.put<any>(url,data);
    }
    return this.http.post<any>(url,data);
}

getAwbIssue(id){
    const url = this.API_URL + environment.awbissue + ( id?"/"+id:"");
    return this.http.get<any>(url);
}

deleteAwbIssue(id){
    const url = this.API_URL + environment.awbissue + ( id? "/"+id : "");
    return this.http.delete<any>(url);
}

    
}