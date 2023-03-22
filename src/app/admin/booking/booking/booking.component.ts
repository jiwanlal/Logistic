import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/service/notification.service';
import { BookingService } from '../booking.service';
import { AddBookingComponent } from '../dialog/add-booking/add-booking.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.sass']
})
export class BookingComponent {
  Titlename = 'Bookings';
  keyword;

  dataSource = [];
  tableHeader = [

    { field: 'seq', name: 'Seq' },
    { field: 'invoice_number', name: 'Invoice No.' },
    { field: 'awb_prefix', name: 'AWB' },
    { field: 'office_name', name: 'Office' },
    { field: 'booking_date', name: 'Booking Date' },
    { field: 'chargeable_weight', name: 'Chargeable Weight' },
    { field: 'total_amount', name: 'Total Amount' },
    { field: 'Actions', name: 'Actions' }

  ]
  tableData: any;


  constructor(public dialogRef: MatDialog, private notification: NotificationService, private bookingService: BookingService) { }

  ngOnInit() {
    this.getBookings();
  }

  deleteRow(rowData) {

    this.bookingService.DeleteBooking(rowData?.booking_id)
    .subscribe(res=>{
      if(res.success){
        this.notification.success('Booking Deleted Successfully.');
        this.getBookings();
      }
    })
  }

  editRow(rowData) {

    const ref = this.dialogRef.open(AddBookingComponent, {
      height: '90vh',
      width: '90%',
      data: rowData,
    });

    ref.afterClosed().subscribe(isAdded => {
      if (isAdded) {
        this.notification.success('Booking Updated Successfully.')
        this.getBookings();
      }
    })

  }

  addRow() {

    const ref = this.dialogRef.open(AddBookingComponent, {
      height: '90vh',
      width: '90%'
    });

    ref.afterClosed().subscribe(isAdded => {
      if (isAdded) {
        this.notification.success('Booking Successfully.')
        this.getBookings();
      }
    })

  }

  filter(value) {
    const filterValue = value;
    this.tableData = new MatTableDataSource(this.dataSource);
    this.tableData.filter = filterValue.trim().toLowerCase();

  }

  private getBookings() {
    this.dataSource =[];
    this.filter('');
    this.bookingService.Getbookings().subscribe(res => {
      this.dataSource = res.data;
      this.filter('');
    })
  }


}
