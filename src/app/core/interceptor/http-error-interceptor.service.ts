import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { NotificationService } from '../service/notification.service';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
    constructor(private notificationService:NotificationService) { } 
    
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        return next.handle(req).pipe(
            catchError((error)=>{
             if(error.status == 400 && error?.error?.success == false && error?.error?.message ){
                this.notificationService.error(error?.error?.message)
             }
            return of('') as Observable<any>
        }));

    }
}  
