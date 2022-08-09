import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'll-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss']
})
export class DashboardIndexComponent implements OnInit {
  latestOrders : any = [];
  userId: any ;

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.userId=parseInt(localStorage.getItem('mnd:uid'));
   this.getLatestOrders();
  }

  getLatestOrders(){
    this.orderService.getOrdersPlaced(this.userId).subscribe((data: any)=> {
      this.latestOrders = data;
      this.latestOrders = this.latestOrders.slice(0,5);
      console.log('Latest Orders Data', this.latestOrders);
    })
  }
}
