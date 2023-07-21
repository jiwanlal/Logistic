import { Component, ViewChild } from '@angular/core';
import { LactiontableComponent } from '../../location/lactiontable/lactiontable.component';
import { zonedatamodal } from '../../location/location.modal';

@Component({
  selector: 'app-a2zreport',
  templateUrl: './a2zreport.component.html',
  styleUrls: ['./a2zreport.component.sass']
})
export class A2zreportComponent {
  public Titlename="AtoZ Reports & MIS"
  public selectoption="Country"
  @ViewChild(LactiontableComponent) child
   public coutrydataobject:any = new zonedatamodal()
   public inload=false
   public countryheader
   public dataForTable
   public dropdowndata
   public selectboxdata
   public pagename='AtoZReportsMISDailog'
   public AddAction={actionName:'Add',popupForm:this.pagename}
   public errormessage
}
