import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTypeComponent } from './user-type/user-type.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { RolesComponent } from './roles/roles.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersdialogComponent } from './dialog/usersdialog/usersdialog.component';
import { DeletedialogComponent } from './dialog/deletedialog/deletedialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DatatableModule } from '../common/datatable.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileuploadComponent } from './dialog/profileupload/profileupload.component';



@NgModule({
  declarations: [
    UserTypeComponent,
    CreateuserComponent,
    RolesComponent,
    UsersdialogComponent,
    DeletedialogComponent,
    UserProfileComponent,
    ProfileuploadComponent

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatTooltipModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTooltipModule,
    ComponentsModule,
    SharedModule, 
    DatatableModule
  ],
  entryComponents:[
    UsersdialogComponent, DeletedialogComponent,ProfileuploadComponent
  ]
  
})
export class UsersModule { }
