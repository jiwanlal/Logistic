import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-datafilter',
  templateUrl: './datafilter.component.html',
  styleUrls: ['./datafilter.component.sass']
})
export class DatafilterComponent implements OnInit {
  @Output() Ontablefilter = new EventEmitter();
  keyword;
  constructor(public service:CommonService){

  }
  ngOnInit(): void {
   
    
  }
 
  applyFilter(event) {
    this.service.filterservice.next(event.target.value)
   // this.Ontablefilter.emit(event.target.value)
}
}