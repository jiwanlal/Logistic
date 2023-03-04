import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessesRoutingModule } from './businesses-routing.module';
import { BusinessesdialogComponent } from './dialogs/businessesdialog/businessesdialog.component';
import { BusinessesdeletedialogComponent } from './dialogs/businessesdeletedialog/businessesdeletedialog.component';
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
import { BranchComponent} from './branch/branch.component';
import { BusinessesTypeComponent } from './businesses/businesses-type.component';
import { BusinessesService } from './businesses.service';
import { CreateofficeComponent } from './createoffice/createoffice.component';



@NgModule({
  declarations: [
    BusinessesdialogComponent,
    BusinessesdeletedialogComponent, BranchComponent, BusinessesTypeComponent, CreateofficeComponent
  ],
  imports: [
    CommonModule,
    BusinessesRoutingModule,
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
  providers:[BusinessesService],
  entryComponents:[BusinessesdeletedialogComponent, BusinessesdialogComponent]
})
export class BusinessesModule { }
