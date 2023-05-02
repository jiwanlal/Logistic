import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwbService } from '../awb-stock/awb.service';
import { AwbsearchService } from './awbsearch.service';

@Component({
  selector: 'app-awbsearch',
  templateUrl: './awbsearch.component.html',
  styleUrls: ['./awbsearch.component.sass']
})
export class AwbsearchComponent implements OnInit {
  public id
  public errormessage
  constructor(public router:ActivatedRoute, public awbsearchdata:AwbsearchService){
    // this.router.params.subscribe(params => {
    //   this.id = params['id'];
    //   });
    //   console.log(this.id);
  }
  ngOnInit(): void {
    // this.router.params.subscribe(params => {
    //   this.id = params['id'];
    //   });
     
      this.awbsearchdata.abwsearchdata.subscribe(res=>{
        console.log(res)
        this.id=res
       // this.errormessage=res['message']
        console.log(this.id);
      })
  }
}
