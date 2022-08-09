import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from "@angular/material/paginator";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAddbookComponent } from './admin-addbook/admin-addbook.component';
import { AdminBooklistComponent } from './admin-booklist/admin-booklist.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminEditbookComponent } from './admin-editbook/admin-editbook.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminService } from '../services/admin.service';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminUsermanagementComponent } from './admin-usermanagement/admin-usermanagement.component';



@NgModule({
  declarations: [
    AdminIndexComponent,
    AdminLayoutComponent,
    AdminAddbookComponent,
    AdminBooklistComponent,
    AdminEditbookComponent,
    AdminOrderComponent,AdminUsermanagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatToolbarModule,
    TableModule,ButtonModule,NgxPaginationModule,MatSlideToggleModule,MatPaginatorModule
  ],
  providers:[AdminService]
})
export class AdminModule { }
