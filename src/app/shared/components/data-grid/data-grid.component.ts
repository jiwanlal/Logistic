import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.sass']
})
export class DataGridComponent {

  @Input('DataSource') dataSource :any;
  @Input('TableHeader') tableHeader:any[];
   displayColumns:any;

  @Output() onRowEdit :EventEmitter<any> = new EventEmitter();
  @Output() onRowDelete :EventEmitter<any> = new EventEmitter();
  objectKeys = Object.keys;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog:MatDialog)
{}

  ngOnInit(){
    this.displayColumns = this.tableHeader.map(x=>x.field)
  }
  ngOnChanges(changes){

    if(changes.dataSource && this.dataSource){
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    }
    console.log(this.sort)
   
  }

  onEdit(row){

    this.onRowEdit.emit(row);
  }
  onDelete(row){

    const ref = this.dialog.open(ConfirmDialogComponent);
    ref.afterClosed().subscribe(isConfirmed=>{

      if(isConfirmed)
      this.onRowDelete.emit(row);


    })
  }
}
