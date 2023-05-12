import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwbService } from '../awb-stock/awb.service';
import { AwbsearchService } from './awbsearch.service';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-awbsearch',
  templateUrl: './awbsearch.component.html',
  styleUrls: ['./awbsearch.component.sass']
})
export class AwbsearchComponent implements OnInit {
  public id
  public errormessage
  public bookingDetails=[]
  public bookingStatus=[]
  constructor(public router:ActivatedRoute, public awbsearchdata:AwbsearchService, public loaderservice:LoaderService){
    // this.router.params.subscribe(params => {
    //   this.id = params['id'];
    //   });
    //   console.log(this.id);
  }
  ngOnInit(): void {
    // this.router.params.subscribe(params => {
    //   this.id = params['id'];
    //   });
    this.loaderservice.Loaderpage.next(true)
     
      this.awbsearchdata.abwsearchdata.subscribe(res=>{
        console.log(typeof res)
       
        
        this.id=Number(res)
        console.log(typeof this.id)
        this.awbsearchdata.awbsearch(this.id).subscribe(res=>{
          console.log(res)
          this.bookingDetails=res.data.bookingDetails
          this.bookingStatus=res.data.bookingStatus
          this.loaderservice.Loaderpage.next(false)
          
        })
       // this.errormessage=res['message']
        console.log(this.id);
      })
  }
}
