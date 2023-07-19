import { Component, Inject, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from 'src/app/core/service/loader.service';
import { ProfileuploadComponent } from '../../users/dialog/profileupload/profileupload.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { drspodModel, inscanDetialsModel } from '../transaction.model';

@Component({
  selector: 'app-drspod',
  templateUrl: './drspod.component.html',
  styleUrls: ['./drspod.component.sass']
})

export class DrspodComponent implements OnInit {
  public errormessage
  dropdowndata: any;
  userImg = 'assets/images/user.png'
  dataSource: any;
  public inscanmodel: drspodModel[] = [];
  uploadDisabled: boolean = true

  displayedColumns: string[] = ['Id', 'DeliveryBoyFirstName', 'DeliveryBoyEmail', 'InscanId', 'AwbNumber', 'status', 'InscanId'];

  inscanID: any;
  drsID: any;

  inputboxdisabled:boolean=true



  constructor(private snackBar: MatSnackBar, public dialog: MatDialog, public LoaderService: LoaderService, public TransactionService: TransactionService) {

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  drspoddForm = new FormGroup({
    dropdownType: new FormControl(),
    Searchvalue: new FormControl(),

  })

  ngOnInit() { }

  Searcheddata(value, type) {
    console.log(value, type)
    this.getdrsforimage(value, type)
  }

  getdrsforimage(id, type) {
    this.TransactionService.getdrsforimage(id, type).subscribe(res => {
      this.dropdowndata = res.data
      if (res.data.length > 0) {
        this.uploadDisabled = false
      }
      this.dataSource = new MatTableDataSource<drspodModel>(this.dropdowndata);
       this.drsID=res.data[0].Id
       this.inscanID=res.data[0].InscanId
      console.log(res)
    })
  }

  onuploadProfileimg(data) {
    console.log('test', data)

    const dialogRef = this.dialog.open(ProfileuploadComponent, {
      data: data,
      minWidth: '475px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)

      if (result) {
        const formData = new FormData();
        formData.append('profile_picture', result.profile_picture)
        console.log(result.profile_picture.name, this.drspoddForm.controls['Searchvalue'].value, data
        )
        //let itemvalue={file:result.profile_picture.name}
        if (data.dropdownType == 'drs') {
          this.TransactionService.drsimagepost(data.Searchvalue, formData).subscribe(res => {
            this.showNotification(
              "snackbar-success",
              res.message,
              "top",
              "right"
            );
          })
        }
        else {
          this.TransactionService.awbimagepost(data.drsID, this.inscanID, formData).subscribe(res => {
            this.showNotification(
              "snackbar-success",
              res.message,
              "top",
              "right"
            );
          })
        }
      }
    });
  }
  cellClicked(awb, drs,InscanId,Id) {
    this.inscanID=InscanId
    this.drsID=Id
    if (this.drspoddForm.controls['dropdownType'].value == 'drs') {
      this.drspoddForm.controls['Searchvalue'].setValue(drs)
    }
    else {
      this.drspoddForm.controls['Searchvalue'].setValue(awb)
    }
    console.log(this.drspoddForm.controls['dropdownType'].value)
  }
  drsimagepost() {
   
  }
  
  Onchange(value){
    if(value!=null){
      this.inputboxdisabled=false
    }
    else{
      this.inputboxdisabled=true

    }
    console.log(value,this.inputboxdisabled
      )
  }

}
