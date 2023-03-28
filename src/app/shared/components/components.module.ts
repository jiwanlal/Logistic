import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SharedModule } from '../shared.module';
import { DataGridComponent } from './data-grid/data-grid.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, DataGridComponent, ConfirmDialogComponent, DatepickerComponent],
  imports: [SharedModule,MatTableModule,MatPaginatorModule,MatDialogModule,MatSortModule,   FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatFormFieldModule],
  exports: [FileUploadComponent, BreadcrumbComponent,DataGridComponent,ConfirmDialogComponent,DatepickerComponent],
})
export class ComponentsModule {}
