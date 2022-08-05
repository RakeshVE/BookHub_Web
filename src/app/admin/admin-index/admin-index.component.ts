import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss']
})
export class AdminIndexComponent implements OnInit {
  latestOrders : any = [];
  dashboarddata:any;
  userId: any = 1; //to be taken from local storge
  constructor(private adminserrvice:AdminService) { }

  ngOnInit(): void {
    this.GetDashboardData();
  }
  GetDashboardData(){
  this.adminserrvice.AdminDashboardData().subscribe((data: any)=> {

    this.dashboarddata=data;
  },
  error => {
  }
  )
}
}
