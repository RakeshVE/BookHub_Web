import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { CartItem } from '../shared/data/CartItem';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseAPIurl: string;
  constructor(private httpClient: HttpClient) {
    this.baseAPIurl = environment.baseUrl
  }

  // GetBookdetail(data:any): Observable<Bookdetail[]> {
  //   debugger
  //   return this.httpClient.get<Bookdetail[]>(this.baseAPIurl + 'api/Books/GetBookById?id='+data);
  //   debugger
  // }
  getAllUsers() {
    return this.httpClient.get(this.baseAPIurl + "Users/GetUsers")
  }

  deactivateUser(userid: any) {
    return this.httpClient.get(this.baseAPIurl + "Users/DeactivateUser?userId=" + userid);
  }
  AddToCart(object: any) {
    debugger
    return this.httpClient.post(this.baseAPIurl + "Cart/AddToCart", object);
  }
  GetItemToCart(object: any) {
    debugger
    return this.httpClient.get(this.baseAPIurl + "Cart/GetItemToCart?id=" + object);
  }
  RemoveToCart(object: any) {
    debugger
    return this.httpClient.post(this.baseAPIurl + "Cart/RemoveToCart", object);
  }
  EmptyToCart(userId: any) {
    debugger
    return this.httpClient.post(this.baseAPIurl + "Cart/EmptyCart", userId);
  }
  UpdateCart(object: any) {
    debugger
    return this.httpClient.post(this.baseAPIurl + "Cart/UpdateCart", object);
  }

  getUserById(id: any) {
    return this.httpClient.get(this.baseAPIurl + 'Users/GetUserById?id=' + id);
  }
  checkOut(totalPrice: any) {
    return this.httpClient.post(this.baseAPIurl + "Orders/Checkout?Checkout=", totalPrice);
  }

  getCart(object: any): Promise<CartItem[]> {
    return this.httpClient.get(
      this.baseAPIurl + "Cart/GetItemToCart?id=" + object,
      { observe: 'response' }
    ).pipe(
      map((httpResponse: HttpResponse<any>) => {
        this.updateCount(httpResponse.body.length); // Don't know how your cardItem[] is formatted
        return [].concat(httpResponse.body);
      })
    ).toPromise();
  }

  private prodCount: number = 0;
  public prodCountCountChange: Subject<number> = new Subject();
  updateCount(count: number = 0): void {
    this.prodCount = count;
    this.prodCountCountChange.next(this.prodCount);
  }

}
