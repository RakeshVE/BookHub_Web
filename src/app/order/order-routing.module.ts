import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderReviewComponent } from './order-review/order-review.component';
import { PaypalComponent } from './paypal/paypal.component';

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
export class OrderRoutingModule {}
