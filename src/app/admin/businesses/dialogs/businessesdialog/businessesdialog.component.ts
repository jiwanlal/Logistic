import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { custompattern } from 'src/app/admin/pattern.modal';

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
  public postcodedata:any=[
    {id:1, postcode_name:'Delhi region'},
    {id:2, postcode_name:'Mumbai'}
  ]
  public parentdata:any=[
    
    {id:2, name:'Mumbai'}
  ]
  public locality:any=[
    
    {id:3, name:'Navi Mumbai'}
  ]
  filteredOptions: Observable<any[]>;
constructor(public dialogRef: MatDialogRef<BusinessesdialogComponent>,@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder){
console.log(data.tabledatadeatils)
this.dialogtitle=data.actionName
}

ngOnInit(): void {

 
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
    postcode:[this.data.tabledatadeatils.parent_office_id],
    country:[this.data.tabledatadeatils.country_id],
    city:[this.data.tabledatadeatils.city_id],
    region:[this.data.tabledatadeatils.region_id],
    locality:[this.data.tabledatadeatils.locality_id],
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
}