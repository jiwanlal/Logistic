import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.sass']
})
export class AddeditComponent implements OnInit {
 constructor(public dialogRef:MatDialogRef<AddeditComponent>,@Inject(MAT_DIALOG_DATA) public data){}
ngOnInit(): void {
  
}
 
}
