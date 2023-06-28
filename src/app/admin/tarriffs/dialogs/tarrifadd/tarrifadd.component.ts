import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { TreeTarriffsService } from '../../tarriffs.service';

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
  filteredzoneTo:Observable<any>;
  filteredregionTo:Observable<any>;
  filteredpincodeTo:Observable<any>;
  filteredcountryTo:Observable<any>;
  filteredlocalityTo:Observable<any>;
  filteredcityTo:Observable<any>;
  filteredstateTo:Observable<any>;
  filteredrateT:Observable<any>;
  filteredcustomerslist:Observable<any>
  filteredlocationtar:Observable<any>
  isDisabled:boolean

  locationTarrifForm = new FormGroup({
    lt_name: new FormControl(this.data.tabledatadeatils.lt_name, []),
    from_locality: new FormControl(this.data.tabledatadeatils.from_locality, []),
    from_post_code: new FormControl(this.data.tabledatadeatils.from_post_code,[]),
    from_city:new FormControl(this.data.tabledatadeatils.from_city,[]),
    from_state:new FormControl(this.data.tabledatadeatils.from_state,[]),
    from_region:new FormControl(this.data.tabledatadeatils.from_region,[]),
    from_zone:new FormControl(this.data.tabledatadeatils.from_zone,[]),
    from_country:new FormControl(this.data.tabledatadeatils.from_country,[]),
    to_locality: new FormControl(this.data.tabledatadeatils.to_locality, []),
    to_post_code: new FormControl(this.data.tabledatadeatils.to_post_code,[]),
    to_city:new FormControl(this.data.tabledatadeatils.to_city,[]),
    to_state:new FormControl(this.data.tabledatadeatils.to_state,[]),
    to_region:new FormControl(this.data.tabledatadeatils.to_region,[]),
    to_zone:new FormControl(this.data.tabledatadeatils.to_zone,[]),
    to_country:new FormControl(this.data.tabledatadeatils.to_country,[])
   
  })
  
  contractTarrifForm = new FormGroup({
    name: new FormControl(this.data.tabledatadeatils.name, [Validators.required]),
    rate_tarrif: new FormControl(this.data.tabledatadeatils.rate_tarrif, [Validators.required]),
    customer: new FormControl(this.data.tabledatadeatils.customer, [Validators.required]),
    gst: new FormControl(this.data.tabledatadeatils.gst,[Validators.required]),
    dsc: new FormControl(this.data.tabledatadeatils.dsc, [Validators.required]),
    insurance: new FormControl(this.data.tabledatadeatils.insurance, [Validators.required]),
    others: new FormControl(this.data.tabledatadeatils.others,[]),
    discount: new FormControl(this.data.tabledatadeatils.discount, [Validators.required]),
    fsc: new FormControl(this.data.tabledatadeatils.fsc, [Validators.required]),
   
  })
  rateTarrifForm: FormGroup = this._formBuilder.group({
    name: [this.data.tabledatadeatils.name],
    location_tarrif: [this.data.tabledatadeatils.location_tarrif],
    AddedControls: this._formBuilder.array([])
  })
  // rateTarrifForm = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   location_tarrif: new FormControl(null, []),
  // })
  dialogtitle: any;
  showCrossbutton: boolean=false;
  loctarfratedropdown: any;
  constructor(public dialogRef: MatDialogRef<TarrifaddComponent>,@Inject(MAT_DIALOG_DATA) public data,private _formBuilder: FormBuilder,public tarrifService:TreeTarriffsService){
    this.dialogtitle=data.actionName
  }
  ngOnInit(): void {
    console.log('DialogComponent',this.data,this.data.tabledatadeatils.loctarfratedropdown)
    this.setFilters()
  }
  // private requireMatch(control: FormControl): ValidationErrors | null {
  //   const selection: any = control.value;
  //   if (this.data.tabledatadeatils.countryData && this.data.tabledatadeatils.countryData.indexOf(selection) < 0) {
  //     return { requireMatch: true };
  //   }
  //   return null;
  // } 
  onNoClick(){
    this.dialogRef.close(false);
  }
  onlocationTarrifSubmit(item,id){
    console.log(item,id)
    if(this.locationTarrifForm.invalid){
      return false
    }
    else{
      console.log(this.locationTarrifForm.value)
      let sumiteddata={
        action:item,
        Id:id,
        itemsumbited:this.locationTarrifForm.value
      }
      console.log(this.locationTarrifForm.value,sumiteddata)
      this.dialogRef.close(sumiteddata)
   
  }
}
onChangeSearch(data){
  console.log(data)
  // this.tarrifService.searchCustomer(data).subscribe(res=>{
    
  //   console.log(res)
  // })
  //   this.tarrifService.searchRateTariff(data).subscribe(res=>{
    
  //   console.log(res)
  // })
 
}
  oncontractTarrifSubmit(item,id){

   console.log(this.contractTarrifForm.value,id)
   if(this.contractTarrifForm.invalid){
    return false
   }
  else{
    let sumiteddata={
      action:item,
      Id:id,
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
        weight_from: new FormControl(""),
        weight_to: new FormControl(""),
        unit: new FormControl(""),
        price: new FormControl(""),
        
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
        return this.data.tabledatadeatils.zoneData.filter(option => option?.zone_name.toLowerCase().includes(value));
      }),
    );
    this.filteredregion = this.locationTarrifForm.controls.from_region.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.regionData.filter(option => option?.region_name.toLowerCase().includes(value));
      }),
    );
    this.filteredstate = this.locationTarrifForm.controls.from_state.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.stateData.filter(option => option?.state_name.toLowerCase().includes(value));
      }),
    );
    this.filteredcity = this.locationTarrifForm.controls.from_city.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.cityData.filter(option => option?.city_name.toLowerCase().includes(value));
      }),
    );
    this.filteredlocality = this.locationTarrifForm.controls.from_locality.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.localityData.filter(option => option?.locality_name.toLowerCase().includes(value));
      }),
    );
    this.filteredcountry = this.locationTarrifForm.controls.from_country.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.countryData.filter(option => option?.country_name.toLowerCase().includes(value));
      }),
    );
    this.filteredpincode = this.locationTarrifForm.controls.from_post_code.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.postcodeData.filter(option => option?.post_code.toLowerCase().includes(value));
      }),
    );
    this.filteredzoneTo = this.locationTarrifForm.controls.to_zone.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.zoneData.filter(option => option?.zone_name.toLowerCase().includes(value));
      }),
    );
    this.filteredregionTo = this.locationTarrifForm.controls.to_region.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.regionData.filter(option => option?.region_name.toLowerCase().includes(value));
      }),
    );
    this.filteredstateTo = this.locationTarrifForm.controls.to_state.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.stateData.filter(option => option?.state_name.toLowerCase().includes(value));
      }),
    );
    this.filteredcityTo = this.locationTarrifForm.controls.to_city.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.cityData.filter(option => option?.city_name.toLowerCase().includes(value));
      }),
    );
    this.filteredlocalityTo = this.locationTarrifForm.controls.to_locality.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.localityData.filter(option => option?.locality_name.toLowerCase().includes(value));
      }),
    );
    this.filteredcountryTo = this.locationTarrifForm.controls.to_country.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.countryData.filter(option => option?.country_name.toLowerCase().includes(value));
      }),
    );
    this.filteredpincodeTo = this.locationTarrifForm.controls.to_post_code.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.postcodeData.filter(option => option?.post_code.toLowerCase().includes(value));
      }),
    );
    this.filteredrateT = this.contractTarrifForm.controls.rate_tarrif.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.ratetarftlist.filter(option => option?.rt_name.toLowerCase().includes(value));
      }),
    );
    this.filteredcustomerslist = this.contractTarrifForm.controls.customer.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.customerslist.filter(option => option?.customer_name.toLowerCase().includes(value));
      }),
    );
    this.filteredlocationtar = this.rateTarrifForm.controls.location_tarrif.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.loctarfratedropdown.filter(option => option?.lt_name.toLowerCase().includes(value));
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
      data = this.data.tabledatadeatils.zoneData.find(x=>x.zone_id==data)
    }
    return data?.zone_name
  }
  displayregion(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.regionData.find(x=>x.region_id==data)
    }
    return data?.region_name
  }
  displaycountry(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.countryData.find(x=>x.country_id==data)
    }
    return data?.country_name
  }
  displaycity(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.cityData.find(x=>x.city_id==data)
    }
    return data?.city_name
  }
  displaystate(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.stateData.find(x=>x.state_id==data)
    }
    return data?.state_name
  }
  displaylocality(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.localityData.find(x=>x.locality_id==data)
    }
    return data?.locality_name
  }
  displaypincode(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.postcodeData.find(x=>x.post_code_id==data)
    }
    return data?.post_code
  }
  displayrateT(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.ratetarftlist.find(x=>x.rt_id==data)
    }
    return data?.rt_name
  }
  displaycustomerslist(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.customerslist.find(x=>x.customer_id==data)
    }
    return data?.customer_name
  }
  displayloctar(data):string{
    if(typeof(data)!='object'){
      data = this.data.tabledatadeatils.loctarfratedropdown.find(x=>x.lt_id==data)
    }
    return data?.lt_name
  }
  onChange(value,event){
  console.log(value)
  // if(value) {
  //   console.log(this.showCrossbutton,this.locationTarrifForm.get('from_zone').value)
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
    this.locationTarrifForm.get('from_zone').setValue('')
  }
  onrateTarrifFormSubmit(item,id){
    console.log(this.rateTarrifForm.value,id)
    if(this.rateTarrifForm.invalid){
     return false
    }
   else{
     let sumiteddata={
       action:item,
       id:id,
       itemsumbited:this.rateTarrifForm.value
     }
     this.dialogRef.close(sumiteddata)
  
   }
    
  }
 
}
