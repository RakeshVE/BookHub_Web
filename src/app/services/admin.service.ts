import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseAPIurl: string;
  constructor(private httpClient:HttpClient) { 
    this.baseAPIurl=environment.baseUrl
  }
  AdminDashboardData(){
    return this.httpClient.get(this.baseAPIurl + 'AdminDashboard/GetDashBoardData' );
  }
}
