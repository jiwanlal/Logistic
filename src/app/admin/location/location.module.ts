import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country/country.component';
import { LoctionRoutingModule } from './location-routing.module';
import { LactiontableComponent } from './lactiontable/lactiontable.component';
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
import { ZoneComponent } from './zone/zone.component';
import { RegionComponent } from './region/region.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { PostalcodeComponent } from './postalcode/postalcode.component';
import { LocalityComponent } from './locality/locality.component';
import { LocationService } from './location.service';
import { LocationdeleteComponent } from './dialogs/locationdelete/locationdelete.component';
import { LocationdialogComponent} from './dialogs/locationdialog/locationdialog.component';
import { DatatableModule } from '../common/datatable.module';




@NgModule({
  declarations: [
    CountryComponent,
    LocationdeleteComponent,
    LocationdialogComponent,
    LactiontableComponent,
    ZoneComponent,
    RegionComponent,
    StateComponent,
    CityComponent,
    PostalcodeComponent,
    LocalityComponent,
    
  ],
  imports: [CommonModule,
    LoctionRoutingModule,
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
  providers:[ LocationService],
  entryComponents:[LocationdeleteComponent,LocationdialogComponent]
})
export class LocationModule { }
