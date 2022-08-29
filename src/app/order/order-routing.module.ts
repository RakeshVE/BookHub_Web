import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderReviewComponent } from './order-review/order-review.component';
import { PaymentComponent } from './payment/payment.component';
import { PaypalComponent } from './paypal/paypal.component';
import { ShippingDetailComponent } from './shipping-detail/shipping-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'order-review'
  },
  {
    path: 'order-review',
    component: OrderReviewComponent
  },
  {
    path: 'paypal',
    component: PaypalComponent
  },
  {
    path: 'shiping',
    component: ShippingDetailComponent
  }
  ,
  {
    path: 'payment',
    component: PaymentComponent
  }
  // {
  //   path: ':id',
  //   component: ProductDetailsComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
