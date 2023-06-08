import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-tarrifadd',
  templateUrl: './tarrifadd.component.html',
  styleUrls: ['./tarrifadd.component.sass']
})
export class TarrifaddComponent implements OnInit {
  filteredloctarf_from
  filteredzone:Observable<any>;
  filteredregion:Observable<any>;
  filteredpincode:Observable<any>;
  filteredcountry:Observable<any>;
  filteredlocality:Observable<any>;
  filteredcity:Observable<any>;
  filteredstate:Observable<any>;
  isDisabled:boolean
  locationTarrifForm = new FormGroup({
    loctarf_name: new FormControl('', [Validators.required]),
    dsc: new FormControl('', []),
    from_locality: new FormControl(null, []),
    from_pincode: new FormControl(null,[]),
    from_city:new FormControl(null,[]),
    from_state:new FormControl(null,[]),
    from_region:new FormControl(null,[]),
    from_zone:new FormControl(null,[]),
    from_country:new FormControl(null,[]),
    to_locality: new FormControl(null, []),
    to_pincode: new FormControl(null,[]),
    to_city:new FormControl(null,[]),
    to_state:new FormControl(null,[]),
    to_region:new FormControl(null,[]),
    to_zone:new FormControl(null,[]),
    to_country:new FormControl(null,[])
   
  })
  contractTarrifForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    rate_tarrif: new FormControl(null, [Validators.required]),
    customer: new FormControl(null, [Validators.required]),
    gst: new FormControl('',[Validators.required]),
    dsc: new FormControl(null, [Validators.required]),
    insurance: new FormControl(null, [Validators.required]),
    others: new FormControl('',[]),
    discount: new FormControl(null, [Validators.required]),
    fsc: new FormControl(null, [Validators.required]),
   
  })
  rateTarrifForm: FormGroup = this._formBuilder.group({
    name: [],
    location_tarrif: [],
    AddedControls: this._formBuilder.array([])
  })
  // rateTarrifForm = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   location_tarrif: new FormControl(null, []),
  // })
  dialogtitle: any;
  showCrossbutton: boolean=false;
  constructor(public dialogRef: MatDialogRef<TarrifaddComponent>,@Inject(MAT_DIALOG_DATA) public data,private _formBuilder: FormBuilder,){
    this.dialogtitle=data.actionName
  }
  ngOnInit(): void {
    console.log('DialogComponent',this.data.tabledatadeatils.zoneData)
    this.setFilters()
  }
  onNoClick(){
    this.dialogRef.close(false);
  }
  onlocationTarrifSubmit(item){
    if(this.locationTarrifForm.invalid){
      return false
    }
    else{
      console.log(this.locationTarrifForm.value)
      let sumiteddata={
        action:item,
        // id:this.data.tabledatadeatils.office_id,
        itemsumbited:this.locationTarrifForm.value
      }
      this.dialogRef.close(sumiteddata)
   
  }
}
  oncontractTarrifSubmit(value,item){

   console.log(this.contractTarrifForm.value)
   if(this.contractTarrifForm.invalid){
    return false
  }
  else{
    let sumiteddata={
      action:item,
      // id:this.data.tabledatadeatils.office_id,
      itemsumbited:this.contractTarrifForm.value
    }
    this.dialogRef.close(sumiteddata)
 
}
  }
  get AddedControls() {
    return this.rateTarrifForm.get("AddedControls") as FormArray;
  }
  addcontent(item,data){
    this.AddedControls.push(
      new FormGroup({
        weight_from: new FormControl(null),
        weight_to: new FormControl(""),
        rs_value: new FormControl(""),
        rate_options: new FormControl(null),
        
      })
    );

  }
  remove(r){
    this.AddedControls.removeAt(r);
    this.rateTarrifForm.value.AddedControls.splice(r, 1);
    
  }
  private setFilters(){
    this.filteredzone = this.locationTarrifForm.controls.from_zone.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.zoneData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredregion = this.locationTarrifForm.controls.from_region.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.regionData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredstate = this.locationTarrifForm.controls.from_region.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.stateData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredcity = this.locationTarrifForm.controls.from_region.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.cityData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredlocality = this.locationTarrifForm.controls.from_region.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.localityData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredcountry = this.locationTarrifForm.controls.from_region.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.countryData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredpincode = this.locationTarrifForm.controls.from_region.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.postcodeData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    

  }
  // displayloctarf_from(data):string{
  //   console.log(data,this.filterdata)
  //   if(typeof(data) != 'object'){
  //     data = this.filterdata.find(x=>x== data)
  //   }
  //   return data
  // }
  displayzone(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.zoneData.find(x=>x.Id==data)
    }
    return data?.Name
  }
  displayregion(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.regionData.find(x=>x.Id==data)
    }
    return data?.Name
  }
  displaycountry(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.countryData.find(x=>x.Id==data)
    }
    return data?.Name
  }
  displaycity(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.cityData.find(x=>x.Id==data)
    }
    return data?.Name
  }
  displaystate(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.stateData.find(x=>x.Id==data)
    }
    return data?.Name
  }
  displaylocality(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.localityData.find(x=>x.Id==data)
    }
    return data?.Name
  }
  displaypincode(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.postcodeData.find(x=>x.Id==data)
    }
    return data?.Name
  }
  onChange(value){
    console.log(value)
  // if(value) {
  //   this.showCrossbutton=true
  // } 
  // else{
  //   this.showCrossbutton=false
  // }
  // const index = this.filterdata.findIndex(x => x === value);
  // this.filteredloctarf_from = this.filterdata.map(item=>{
  //   console.log(item)
  //   if(this.filterdata.indexOf(item)==index){
  //     item.isDisabled=false
  //   }
  //   else{
  //     item.isDisabled=true
  //   }

  // })
  }
  clear(){
    this.locationTarrifForm.get('from_country').setValue(null)
  }
  onrateTarrifFormSubmit(){
    
  }
}
