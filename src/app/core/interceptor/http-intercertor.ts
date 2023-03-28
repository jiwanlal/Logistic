/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class HttpIntercertor implements HttpInterceptor {
  constructor(public accountSrvices: AccountService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const data = request.body;
    if (request.url.includes('login')) {
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: data,
      });
    } else {
      const reqData = JSON.parse(data);
      const tokendata = {
        'x-access-token':sessionStorage.getItem(),
        uname: this.accountSrvices.USER_NAME,
        clientcode: this.accountSrvices.CLIENT_CODE
      };
      const body = {
        ...reqData,
        ...tokendata,
      };
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body,
      });
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (
              event.body.tokenstatus !== undefined &&
              !event.body.tokenstatus
            ) {
              //If tokenstatus is failed then redirect to login page.
            }
          }
        },
        (err) => {
          //anything we want to do if we get an error response
        },
        () => {
          //It load on the success response of all api call
        }
      )
    );
  }
}
