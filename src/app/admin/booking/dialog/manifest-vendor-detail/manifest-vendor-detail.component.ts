import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { NotificationService } from 'src/app/core/service/notification.service';
import { BookingService } from '../../booking.service';

@Component({
  selector: 'app-manifest-vendor-detail',
  templateUrl: './manifest-vendor-detail.component.html',
  styleUrls: ['./manifest-vendor-detail.component.sass']
})
export class ManifestVendorDetailComponent {


  dialogtitle = " Other Details For Manifest "

  vendors:any[]=[];
  wheels:any[]=[];

  filteredVendors:Observable<any>;
  filteredWheels:Observable<any>;

  formdata= new FormGroup({
    vendor_id: new FormControl(null,[]),
    wheel_detail_id: new FormControl(null,[]),
    manifest_id: new FormControl(null,[]),
  })

  constructor(public dialogRef: MatDialogRef<ManifestVendorDetailComponent>, @Inject(MAT_DIALOG_DATA) public data,private service:BookingService,private notification:NotificationService){}

  ngOnInit(){

    this.setDefaultValue();
    this.setFilters();

  }

  private setDefaultValue(){
    this.formdata.controls.manifest_id.setValue(this.data.manifestId);

    this.vendors = this.data?.vendorFillValues?.vendors;
    this.wheels = this.data?.vendorFillValues?.wheels;

  }

  private setFilters(){
    this.filteredVendors = this.formdata.controls.vendor_id.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof (value) == 'string' ? value?.toLowerCase() : ''
        return this.vendors.filter(option => option?.OfficeName?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );

    this.filteredWheels = this.formdata.controls.wheel_detail_id.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof (value) == 'string' ? value?.toLowerCase() : ''
        return this.wheels.filter(option => option?.name?.toString()?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );
  }

  displayFunc(list, key, displaykey, value): string {
    if (typeof (value) != 'object') {
      value = list.find(x => x?.[key]?.toString()?.indexOf(value) != -1)
    }
    return value?.[displaykey];
  }

  onSubmit(){

    if(this.formdata.invalid){
      return;
    }

    this.service.CreateManifestDetail(this.formdata.value,this.data.manifestId)
    .subscribe(res=>{
      if(res.success){
         this.notification.success('Vendor details saved successfully');
         this.close();
      }

    })

  }

  close(){

    this.dialogRef.close();
  }
}
