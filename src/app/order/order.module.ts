import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderReviewComponent } from './order-review/order-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaypalComponent } from './paypal/paypal.component';


@NgModule({
  declarations: [
    OrderReviewComponent,
    PaypalComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderModule { }
