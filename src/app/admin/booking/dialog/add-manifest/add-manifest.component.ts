import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { NotificationService } from 'src/app/core/service/notification.service';
import { BookingService } from '../../booking.service';
import { ManifestVendorDetailComponent } from '../manifest-vendor-detail/manifest-vendor-detail.component';

@Component({
  selector: 'app-add-manifest',
  templateUrl: './add-manifest.component.html',
  styleUrls: ['./add-manifest.component.sass']
})
export class AddManifestComponent {

  dialogtitle ="Add Manifest"

  offices:any[]=[];
  filteredDestinationOffices:Observable<any>;

  awbNos:any[]=[];
  filteredAwbNos:Observable<any>;
  defaultValues: any;
  vendors:any[]=[];
  wheels:any[]=[];
  isHeadOffice: any;

  constructor(private matdialogRef :MatDialogRef<AddManifestComponent>,private service:BookingService,private matDialog:MatDialog,private notification:NotificationService){}

  formdata= new FormGroup({
    manifest_date: new FormControl(null,[Validators.required]),
    origin_office_id: new FormControl(null,[Validators.required]),
    destination_office_id: new FormControl(null,[Validators.required]),
    awb_id: new FormControl(null,[Validators.required]),
  });

  ngOnInit(){

    this.getFillValues(()=>{
    
        this.setFilters();
        this.setDefaults();

    })
  }


  private setDefaults(){

    this.formdata.controls.origin_office_id.setValue(this.defaultValues?.officeId)
    if(!this.isHeadOffice){
      this.formdata.controls.origin_office_id.disable();
    }
    this.formdata.controls.manifest_date.setValue(new Date());

  }
  private setFilters(){
    this.filteredDestinationOffices = this.formdata.controls.destination_office_id.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof (value) == 'string' ? value?.toLowerCase() : ''
        return this.offices.filter(option => option?.OfficeName?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );

    this.filteredAwbNos = this.formdata.controls.awb_id.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof (value) == 'string' ? value?.toLowerCase() : ''
        return this.awbNos.filter(option => option?.awb_prefix?.toString()?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );
  }

  displayFunc(list, key, displaykey, value): string {
    if (typeof (value) != 'object') {
      value = list.find(x => x?.[key]?.toString()?.indexOf(value) != -1)
    }
    return value?.[displaykey];
  }

  close(){
    this.matdialogRef.close();
  }

  onSubmit(){
    
    if(this.formdata.invalid){
      return;
    }

    let val = this.formdata.getRawValue();
    let data:any = val;
    data.booking_id = val.awb_id;

    this.service.CreateManifest(val).subscribe(res=>{

      if(res.success){
        this.notification.success("Manifest created successfully.");
        this.matdialogRef.close(true);

        const vendorFillValues = {
          vendors:this.vendors,
          wheels:this.wheels
        }
          this.promptVendorDetail({
            manifestId:res?.data.manifestId,
            vendorFillValues
          });
      }

    })

  }

  private promptVendorDetail(fillValues){


    const ref = this.matDialog.open(ManifestVendorDetailComponent,{
      hasBackdrop:false,
      data:fillValues
    })

    // ref.afterClosed().subscribe(res=>{
    //   this.matdialogRef.close();
    // })

  }

  getFillValues(cb){

    this.service.GetFillValuesManifest()
    .subscribe(res=>{

      this.offices = res.data?.offices;
      this.awbNos = res.data?.awbNos;
      this.defaultValues = res.data?.defaultValues;
      this.vendors = res.data?.vendors,
      this.wheels = res.data?.wheelDetails
      this.isHeadOffice = res.data?.isHeadOffice

      setTimeout(() => {
        cb();
      }, 20);

    })
  }
}
