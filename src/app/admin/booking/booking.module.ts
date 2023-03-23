import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingComponent } from './booking/booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { AddBookingComponent } from './dialog/add-booking/add-booking.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DimensionValidator } from './validators/dimension-validator.validator';
import { NotificationService } from 'src/app/core/service/notification.service';



@NgModule({
  declarations: [
    BookingComponent,
    AddBookingComponent,
    DimensionValidator
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    MatIconModule,
    MatButtonModule,
    ComponentsModule,
    SharedModule,
    BookingRoutingModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers:[NotificationService]
  
})
export class BookingModule { }
