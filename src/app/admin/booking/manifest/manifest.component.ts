import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/service/notification.service';
import { BookingService } from '../booking.service';
import { AddManifestComponent } from '../dialog/add-manifest/add-manifest.component';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.sass']
})
export class ManifestComponent {
  Titlename = 'Manifest';
  keyword;
  public errormessage
  dataSource = [];
  tableHeader = [

    { field: 'seq', name: 'Seq' },
    { field: 'id', name: 'Manifest No.' },
    { field: 'awb_no', name: 'AWB No.' },
    { field: 'origin_office', name: 'Origin Office' },
    { field: 'destination_office', name: 'Destination Office' },
    { field: 'manifest_date', name: 'Manifest Date' },
    { field: 'Actions', name: 'Actions' }

  ]
  tableData: any;

  constructor(private dialogRef:MatDialog,private service:BookingService,private notification:NotificationService,public LoaderService:LoaderService){

  }

  ngOnInit(){

    this.fetchData();
  }

  deleteRow(rowData) {

    this.service.DeleteManifest(rowData?.id)
    .subscribe(res=>{
      if(res.success){
        this.notification.success('Manifest Deleted Successfully.');
        this.fetchData();
      }
    })
  }

  editRow(rowData) {

    // const ref = this.dialogRef.open(AddBookingComponent, {
    //   height: '90vh',
    //   width: '90%',
    //   data: rowData,
    // });

    // ref.afterClosed().subscribe(isAdded => {
    //   if (isAdded) {
    //     this.notification.success('Booking Updated Successfully.')
    //     this.getBookings();
    //   }
    // })

  }

  addRow() {

    const ref = this.dialogRef.open(AddManifestComponent, {
      width: '50%',
      height:'100%',
      position: { right: '0',top:'0', bottom:'0'}
     
    });

    ref.afterClosed().subscribe(isAdded => {
      if (isAdded) {
        setTimeout(() => {
          this.fetchData();
        }, 200);
      }
    })

  }

  filter(value) {
    const filterValue = value;
    this.tableData = new MatTableDataSource(this.dataSource);
    this.tableData.filter = filterValue.trim().toLowerCase();

  }

  private fetchData(){
    this.LoaderService.Loaderpage.next(true)
    this.dataSource =[];
    this.filter('');
    this.service.GetManifests()
    .subscribe(res=>{

       this.dataSource = res.data;
       this.errormessage=res['message']
       this.filter('');
       this.LoaderService.Loaderpage.next(false)
    })
  }

}
