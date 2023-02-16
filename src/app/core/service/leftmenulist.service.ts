import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {RouteInfo} from '../../layout/sidebar/sidebar.metadata'

@Injectable({
  providedIn: 'root'
})

export class LeftmenulistService {
  public configUrl = 'assets/i18n/en.json';
  constructor(public http:HttpClient) { }

  getMenulist(){
   return  this.http.get<any>(this.configUrl)
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

