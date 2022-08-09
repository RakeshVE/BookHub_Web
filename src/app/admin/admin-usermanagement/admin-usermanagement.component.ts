import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'; 
import {MatSort} from '@angular/material/sort';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/data/user';



@Component({
  selector: 'app-admin-usermanagement',
  templateUrl: './admin-usermanagement.component.html',
  styleUrls: ['./admin-usermanagement.component.scss']
})
export class AdminUsermanagementComponent implements AfterViewInit  {

  displayedColumns: string[] = ['firstName', 'userName', 'email', 'phone','status','action'];
  dataSource: MatTableDataSource<User>;
  users:User[];

  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  status: any;

  constructor(private userService:UserService) { 
    this.dataSource = new MatTableDataSource(this.users);
    
    // Assign the data to the data source for the table to render
    
  }

  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllUsers();
    
  }

  getAllUsers(){
    const users=this.userService.getAllUsers().subscribe((data:any)=>{
     this.users=data;
     this.dataSource = new MatTableDataSource(this.users);
    

    }) 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DeactivateUser(userId:any){
    //alert(userId);

    this.userService.deactivateUser(userId).subscribe((data:any)=>{
        this.status=data;
        console.log("return status:",this.status);

    })
  }


}
