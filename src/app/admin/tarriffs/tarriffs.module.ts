import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeTarriffsRoutingModule } from './tarriffs-routing.module';
import { LocationTarrifComponent } from './location-tarrif/location-tarrif.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DatatableModule } from '../common/datatable.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ContractComponent } from './contract/contract.component';
import { TarrifdeleteComponent } from './dialogs/tarrifdelete/tarrifdelete.component';
import { RateTarrifComponent } from './rate-tarrif/rate-tarrif.component';
import { TarrifaddComponent } from './dialogs/tarrifadd/tarrifadd.component';
import { NgSelectModule } from '@ng-select/ng-select';





@NgModule({
  declarations: [
    LocationTarrifComponent,
    TarrifaddComponent,
    TarrifdeleteComponent,
    ContractComponent,
    RateTarrifComponent

 
  ],
  imports: [
    CommonModule,
    TreeTarriffsRoutingModule,
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
    DatatableModule,
    MatAutocompleteModule,
    MatIconModule,
    NgSelectModule
  ],
  entryComponents:[TarrifaddComponent]
})
export class TreeTarriffsModule { }
