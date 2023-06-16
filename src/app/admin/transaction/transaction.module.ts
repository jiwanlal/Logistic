import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionService } from './transaction.service';
import { InscanComponent } from './inscan/inscan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    InscanComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers:[TransactionService]

})
export class TransactionModule { }
