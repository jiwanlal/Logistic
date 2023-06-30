import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API_URL = environment.apiUrl

  constructor(public http:HttpClient) { }
  getdashboard() {
    const url = this.API_URL + environment.dashboard
    return this.http.get<any>(url)
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

