import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.scss']
})
export class DashboardOrderComponent implements OnInit {

  public orderDetails: any;
  userId : any;
  
  ordersPlaced: any = [];

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.userId=parseInt(localStorage.getItem('mnd:uid'));
    this.getOrdersPlaced();
  }

  getOrdersPlaced(){
    this.orderService.getOrdersPlaced(this.userId).subscribe((data: any)=>{
      this.ordersPlaced = data;
      console.log('Orders Placed Data', this.ordersPlaced);
    })
  }

}
