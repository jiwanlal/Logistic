import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LactiontableComponent } from '../lactiontable/lactiontable.component';
import { CountrylistService } from './countrylist.service';
import { countrydatamodal} from './location.modal';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.sass']
})
export class CountryComponent implements OnInit, OnChanges{
public Titlename="Country List"
@ViewChild(LactiontableComponent) child
 public coutrydataobject:any = new countrydatamodal()
 public inload=false
 public countryheader
 public dataForTable
  constructor(public contrylistservice:CountrylistService){ }
ngOnInit(): void {
  this.Oncountrylist()
  
}
ngOnChanges(changes: SimpleChanges): void {
  console.log(changes)
  //this.addItem(changes)
}
addItem(event){
console.log(event.itemsumbited
  )
if(event.action=='Edit'){
  this.updateRowData(event.itemsumbited)
}

}

updateRowData(row_obj){
  this.dataForTable= this.dataForTable.filter((value,key)=>{
    if(value.id == row_obj.id){
      value.country_name = row_obj.title;
      console.log( this.dataForTable)
   
  let itemvalue={id:row_obj.id,
    country_name:row_obj.title
  }
    this.contrylistservice.countrypost(itemvalue).subscribe(res=>{
      console.log(res)
      this.Oncountrylist()
    })
   
  }
    return true;
  });
}

Oncountrylist(){

  this.contrylistservice.contrylist().subscribe(res=>{
    this.coutrydataobject=res
    if(this.coutrydataobject.success==true){
      
 
      let tableColNamesFromAPI=[]
        let tableColNamesWithSpace={}
      if(this.coutrydataobject.data.length>0){
       
            let i=0
            let Actions=['Edit','Delete']
            let actionIcon=['edit','delete']
            this.coutrydataobject.data.forEach(element => {
              element.id=i+1
              element.Actions=Actions
              element.actionIcon=actionIcon
              element.popupFrom='countryDailog'
              
              i+=1
              element.country_name=element.country_name==null?'':element.country_name.charAt(0).toUpperCase()+ element.country_name.slice(1)
            })
    
              tableColNamesFromAPI=Object.keys(this.coutrydataobject.data[0])
              for(let i=0;i<tableColNamesFromAPI.length;i++){
                tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
              }
              this.countryheader=tableColNamesWithSpace
              this.countryheader.id='ID'//changed from Ui need cahnge col name fron Db
              this.countryheader.country_name='Country Name'
              delete this.countryheader.actionIcon
              delete this.countryheader.popupFrom
              this.dataForTable= this.coutrydataobject.data
              console.log(this.coutrydataobject.data, this.countryheader)
              this.inload=true
      }
    
      }

  })

//  console.log( this.coutrydataobject.data)

  
}
   
  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
  }
}
