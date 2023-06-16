import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  filteredzoneTo:Observable<any>;
  filteredregionTo:Observable<any>;
  filteredpincodeTo:Observable<any>;
  filteredcountryTo:Observable<any>;
  filteredlocalityTo:Observable<any>;
  filteredcityTo:Observable<any>;
  filteredstateTo:Observable<any>;
  isDisabled:boolean
  
  locationTarrifForm = new FormGroup({
    Name: new FormControl(this.data.tabledatadeatils.Name, []),
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
    console.log('DialogComponent',this.data)
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
        weight_from: new FormControl(""),
        weight_to: new FormControl(""),
        rs_value: new FormControl(""),
        rate_options: new FormControl(""),
        
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
    this.filteredstate = this.locationTarrifForm.controls.from_state.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.stateData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredcity = this.locationTarrifForm.controls.from_city.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.cityData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredlocality = this.locationTarrifForm.controls.from_locality.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.localityData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredcountry = this.locationTarrifForm.controls.from_country.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.countryData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredpincode = this.locationTarrifForm.controls.from_post_code.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.postcodeData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredzoneTo = this.locationTarrifForm.controls.to_zone.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.zoneData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredregionTo = this.locationTarrifForm.controls.to_region.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.regionData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredstateTo = this.locationTarrifForm.controls.to_state.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.stateData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredcityTo = this.locationTarrifForm.controls.to_city.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.cityData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredlocalityTo = this.locationTarrifForm.controls.to_locality.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.localityData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredcountryTo = this.locationTarrifForm.controls.to_country.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.data.tabledatadeatils.countryData.filter(option => option?.Name.toLowerCase().includes(value));
      }),
    );
    this.filteredpincodeTo = this.locationTarrifForm.controls.to_post_code.valueChanges.pipe(
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
  console.log(value,this.showCrossbutton,this.locationTarrifForm.get('from_zone').value)
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
  onrateTarrifFormSubmit(item){
    console.log(this.rateTarrifForm.value)
    if(this.rateTarrifForm.invalid){
     return false
    }
   else{
     let sumiteddata={
       action:item,
       // id:this.data.tabledatadeatils.office_id,
       itemsumbited:this.rateTarrifForm.value
     }
     this.dialogRef.close(sumiteddata)
  
   }
    
  }
}
