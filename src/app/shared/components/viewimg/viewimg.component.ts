import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewimg',
  templateUrl: './viewimg.component.html',
  styleUrls: ['./viewimg.component.sass']
})
export class ViewimgComponent implements OnInit {
  primaryUrl=environment.apiUrl
  @Input()imgurl
  @Input()imgsize
  constructor(){}
  ngOnInit(): void {
    
  }

 
  

}
