import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  BehaviorSubject, of,catchError, Observable,throwError as observableThrowError, map  } from 'rxjs';

import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { userdeatils } from 'src/app/authentication/signin/signin.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public configUrl = environment.apiUrl+environment.companies;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // login(company_id:number,username: string, password: string) {
  //   return this.http
  //     .post<any>(`${environment.apiUrl}authenticate`, {
  //       username,
  //       password,
  //     })
  //     .pipe(
  //       map((user) => {
         

  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //         return user;
  //       })
  //     );
  // }
  login(client_id:number,email: string, password: string) {
    let url =environment.apiUrl+environment.authenticate
    return this.http
      .post<any>(url, {
        client_id,
        email,
        password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        }),
      
       map((user) => {
         console.log(user)
         let item={role:"Admin",accessToken:user.accessToken,id:6}
         localStorage.setItem('currentUser',JSON.stringify(item));
          this.currentUserSubject.next(item);
         return user;
       })
      );
  }
  getUserList(){
    return this.http.get<any>(this.configUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}

