import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.sass']
})
export class AddeditComponent implements OnInit {
  myForm:FormGroup
 constructor(public dialogRef:MatDialogRef<AddeditComponent>,@Inject(MAT_DIALOG_DATA) public data, public fb:FormBuilder){}

ngOnInit() {
  this.myForm = this.fb.group({
    
  })
}
}
