import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseAPIurl: string;
  constructor(private httpClient:HttpClient) { 
    this.baseAPIurl=environment.baseUrl
  }

  // GetBookdetail(data:any): Observable<Bookdetail[]> {
  //   debugger
  //   return this.httpClient.get<Bookdetail[]>(this.baseAPIurl + 'api/Books/GetBookById?id='+data);
  //   debugger
  // }
  AddToCart(object:any) {
    debugger
    return this.httpClient.post(this.baseAPIurl + "Cart/AddToCart" ,object);
  }
  GetItemToCart(object:any) {
    debugger
    return this.httpClient.get(this.baseAPIurl + "Cart/GetItemToCart?id="+object);
  }
  RemoveToCart(object:any) {
    debugger
    return this.httpClient.post(this.baseAPIurl + "Cart/RemoveToCart" ,object);
  }
  EmptyToCart(userId: any) {
    debugger
    return this.httpClient.post(this.baseAPIurl + "Cart/EmptyCart" ,userId);
  }
  UpdateCart(object:any) {
    debugger
    return this.httpClient.post(this.baseAPIurl + "Cart/UpdateCart" ,object);
  }

  getUserById(id: any){
    return this.httpClient.get(this.baseAPIurl + 'Users/GetUserById?id=' + id);
  }
  checkOut(totalPrice:any){
    return this.httpClient.post(this.baseAPIurl + "Orders/Checkout?Checkout=" , totalPrice);
  }
 
}
