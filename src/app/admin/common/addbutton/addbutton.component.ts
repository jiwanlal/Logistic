import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-addbutton',
  templateUrl: './addbutton.component.html',
  styleUrls: ['./addbutton.component.sass']
})
export class AddbuttonComponent implements OnInit {
  @Output() OnAdd = new EventEmitter();
  @Input() action={actionName:'',popupForm:''}
  
  constructor(){}
  ngOnInit(): void {
    console.log(this.action)
    
  }
  addcontent(actionName,popupForm) {
    let additem={actionName,popupForm}
    this.OnAdd.emit(additem)
   }
  
}
