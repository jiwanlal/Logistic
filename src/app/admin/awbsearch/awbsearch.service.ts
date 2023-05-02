import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwbsearchService {
 public abwsearchdata=new BehaviorSubject('')
  constructor() { }
}
