import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import { orderdetail } from 'src/app/shared/data/orderdetail';
import { User } from 'src/app/shared/data/user';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {
  Orderdata:orderdetail[];
  p: number = 1;
  first = 0;
  rows = 10;
  isActive:any;
  constructor(private _userService:UserService,
    private _orderService:OrdersService) { }

  ngOnInit(): void {
    this. getUsers();
  }

  getUsers(){
this._orderService.getOrdersDetails().subscribe((data: any)=> {

  this.Orderdata=data;
},
error => {
});

  }

}
