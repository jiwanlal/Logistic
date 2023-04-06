import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatBadgeModule } from "@angular/material/badge";
import { AuthLayoutComponent } from "./app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./app-layout/main-layout/main-layout.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//import { PageLoaderComponent } from "./page-loader/page-loader.component";
@NgModule({
  declarations: [AuthLayoutComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
  ]
  
})
export class LayoutModule {}
