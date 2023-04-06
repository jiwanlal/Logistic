import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public Loaderpage= new BehaviorSubject(false);
 // sidebarState = this.sidebarSubject.asObservable();

  // loaderservice = (value: boolean) => {
  //   this.Loaderpage.next(value);
  // };

  constructor() {}
}
