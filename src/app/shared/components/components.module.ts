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

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, DataGridComponent, ConfirmDialogComponent],
  imports: [SharedModule,MatTableModule,MatPaginatorModule,MatDialogModule,MatSortModule],
  exports: [FileUploadComponent, BreadcrumbComponent,DataGridComponent,ConfirmDialogComponent],
})
export class ComponentsModule {}
