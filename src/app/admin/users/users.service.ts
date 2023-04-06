import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable,throwError as observableThrowError  } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly API_URL = environment.apiUrl

  constructor(public http:HttpClient) { }

  roleget(){
    const url = this.API_URL+environment.role
    return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }
  rolepost(body){
    const url = this.API_URL + environment.role
    return this.http.post<any>(url,body).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }
  roleput(id:number, data){
    const url = this.API_URL + environment.role+ `/${id}`;
    return this.http.put<any>(url,data).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }
  roledelete(id:number){
    const url = this.API_URL + environment.role+ `/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }
////// role service end/////
userget(){
 
  const url = this.API_URL+environment.user
  return this.http.get(url).pipe(
    catchError((error: HttpErrorResponse) => {
      return observableThrowError(error);
    })
  );
}
userpost(body):Observable<any>{
  const url = this.API_URL + environment.user
  return this.http.post<any>(url,body).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error)
      return observableThrowError(error)
    }))
}
userput(id:number, data){
  const url = this.API_URL + environment.user+ `/${id}`;
  return this.http.put<any>(url,data).pipe(
    catchError((error: HttpErrorResponse) => {
      return observableThrowError(error);
    })
  );
}
userdelete(id:number){
  const url = this.API_URL + environment.user+ `/${id}`;
  return this.http.delete<any>(url).pipe(
    catchError((error: HttpErrorResponse) => {
      return observableThrowError(error);
    })
  );
}
companyList(){
  let url =this.API_URL + environment.companies
  return this.http.get<any>(url).pipe(
    catchError((error: HttpErrorResponse) => {
      return observableThrowError(error);
    })
  );
}

Onchangpassword(id:number,data){
  const url = this.API_URL + environment.changepassword+ `/${id}`;
  return this.http.put<any>(url,data).pipe(
    catchError((error: HttpErrorResponse) => {
      return observableThrowError(error);
    })
  );
}
Onchangprofile(id:number,data){
  const url = this.API_URL + environment.profile+ `/${id}`;
  return this.http.put<any>(url,data).pipe(
    catchError((error: HttpErrorResponse) => {
      return observableThrowError(error);
    })
  );
}
OnChangeStatus(id:number,data){
  const url = this.API_URL + environment.status+ `/${id}`;
  return this.http.put<any>(url,data).pipe(
    catchError((error: HttpErrorResponse) => {
      return observableThrowError(error);
    })
  );
}


}
