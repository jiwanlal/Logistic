import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
public filterservice=new BehaviorSubject('')
  constructor() { }
}
