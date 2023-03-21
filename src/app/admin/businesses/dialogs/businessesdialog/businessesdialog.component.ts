import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { custompattern } from 'src/app/admin/pattern.modal';
import { BusinessesService } from '../../businesses.service';

@Component({
  selector: 'app-businessesdialog',
  templateUrl: './businessesdialog.component.html',
  styleUrls: ['./businessesdialog.component.sass']
})
export class BusinessesdialogComponent implements OnInit {
  public formdata:any=FormGroup;
  public officeform:any=FormGroup
  myControl = new FormControl<any>('');

  public Onlyalphabets=new custompattern()
  public dialogtitle:string
  public postcodedata:any=[]
  public parentdata:any=[]
  public localitydata:any=[]
  public placesdata=[]
  filteredOptions: Observable<any[]>;
constructor(public dialogRef: MatDialogRef<BusinessesdialogComponent>,@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder,public postcodeservice:BusinessesService){
console.log(data.tabledatadeatils.placesdata)
this.dialogtitle=data.actionName
}

ngOnInit(): void {
 if(this.dialogtitle=='Edit'){
this.onChangePost(this.data.tabledatadeatils.post_code_id)
}

  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => {
      const name = typeof value === 'string' ? value : value?.name;
      return name ? this._filter(name as string) : this.postcodedata.slice();
    }),
  );


  this.formdata = this.formBuilder.group({
    CommonName:['',[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
    description:['']
    })
    this.officeform=this.formBuilder.group({
    officename:[this.data.tabledatadeatils.office_name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
    parentoffice:[this.data.tabledatadeatils.parent_office_id],
    description:[this.data.tabledatadeatils.description],
    hubid:[this.data.tabledatadeatils.hub_id],
    postcode:[this.data.tabledatadeatils.post_code_id],
    country:[this.data.tabledatadeatils.country_id],
    city:[this.data.tabledatadeatils.city_id],
    region:[this.data.tabledatadeatils.region_id],
    locality:[this.data.tabledatadeatils.locality_id],
    state:[this.data.tabledatadeatils.state_id],
    telephone:[this.data.tabledatadeatils.telephone],
    email:[this.data.tabledatadeatils.email],
    mobile:[this.data.tabledatadeatils.mobile],
    address:[this.data.tabledatadeatils.address],
    gstname:[this.data.tabledatadeatils.gst_name,[Validators.required]],
    gstid:[this.data.tabledatadeatils.gst_number,[Validators.required]],
    zone:[this.data.tabledatadeatils.zone_id],
    creditlimit:[this.data.tabledatadeatils.credit_limit],
    businesstypeid:[this.data.tabledatadeatils.business_type_id],
    branchtypeid:[this.data.tabledatadeatils.branch_type_id],
    

    })
    this.onChangePost(this.data.tabledatadeatils.post_code_id)

    // if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.dailogPage!='officeDailog'){
// if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.dailogPage!='officeDailog'){
     
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
        description:[this.data.tabledatadeatils.description]
       })
       


    
    
    
}
change(event){
 
console.log(event)
}
onSubmit(item,id:number){
  console.log(this.formdata.value,id
    )
  if(this.formdata.invalid){
    return false
  }
  // if(this.formdata.controls['CommonName'].value==this.data.tabledatadeatils.country_name && item=='Edit'){
  //   this.dialogRef.close(false)

  // }
  else{
    let sumiteddata={
      action:item,
      id:id,
      itemsumbited:this.formdata.value
    }
    this.dialogRef.close(sumiteddata)
  
   

  }

}
onofficeSubmit(item,id:number){
  console.log(this.formdata.value,id)
  if(this.officeform.invalid){
    return false
  }
  // if(this.formdata.controls['CommonName'].value==this.data.tabledatadeatils.country_name && item=='Edit'){
  //   this.dialogRef.close(false)

  // }
  else{
    let sumiteddata={
      action:item,
      id:this.data.tabledatadeatils.office_id,
      itemsumbited:this.officeform.value
    }
    this.dialogRef.close(sumiteddata)
  
   

  }

}


onNoClick(): void {
  this.dialogRef.close(false);
}

displayFn(user:any): string {
  console.log(user)
  return user && user.name ? user.name : '';
}

private _filter(name: string): any[] {
  const filterValue = name.toLowerCase();

  return this.postcodedata.filter(option => option.name.toLowerCase().includes(filterValue));
}
onChangePost(event){
  console.log(event)
  this.postcodeservice.getpostcode(event).subscribe(res=>{
    console.log(res)
    this.postcodedata=res.data
    console.log(this.localitydata)
    this.localitydata=this.postcodedata[0].Localities
    this.officeform.patchValue({
      country:this.postcodedata[0].country_id,
      city:this.postcodedata[0].city_id,
      region:this.postcodedata[0].region_id,
      state:this.postcodedata[0].state_id,
      zone:this.postcodedata[0].zone_id,

    })
    for (var i in this.postcodedata[0]){
      console.log(i,this.postcodedata[0][i], {key:i,name:this.postcodedata[0][i]});
      delete this.postcodedata[0].city_id
      delete this.postcodedata[0].state_id
      delete this.postcodedata[0].country_id
      delete this.postcodedata[0].Localities
      delete this.postcodedata[0].zone_id
      delete this.postcodedata[0].region_id
      this.placesdata.push({key:i,name:this.postcodedata[0][i]})
      console.log(this.placesdata)
     
  }


    
console.log(this.officeform.value)

  })
}
attributeDisplay(attribute1,attribute2){
  if (attribute1.locality_id == attribute2.locality_id) {
    return attribute1.locality_name;
  } else {
    return "";
  }
  }

}