import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WishListItem } from '../shared/data/WishListItem';
import { orderdetail } from '../shared/data/orderdetail';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl;

  getWishListItem(route: string) {
    return this.http.get<WishListItem[]>(this.baseUrl + route);
  }

  getOrdersStatus() {
    return this.http.get<orderdetail[]>(this.baseUrl + 'Orders/GetOrderStatus');
  }

  createCheckout(totalAmount: any, userID: any) {
    return this.http.post(this.baseUrl + 'Orders/Checkout?userId=' + userID, totalAmount);
  }

  addShippingDetails(shippingDetails: any) {
    return this.http.post(this.baseUrl + 'Orders/ShippingDetails', shippingDetails);
  }

  addOrderDetails(bookIds: any, userId: any, checkoutId: any) {
    return this.http.post(this.baseUrl + 'Orders/AddOrderDetails?userId=' + userId + '&checkoutId=' + checkoutId, bookIds);
  }

  getOrdersPlaced(userId: any) {
    return this.http.get(this.baseUrl + 'Orders/GetOrdersPlaced?userId=' + userId);
  }
  stripePayments(bodyString: any) {
    return this.http.post(this.baseUrl + 'Orders/StripePayment', bodyString);
  }
  getOrdersDetails() {
    return this.http.get(this.baseUrl + 'Orders/GetOrders');
  }
  addPaymentDetails(PaymentDetails: any) {
    return this.http.post(this.baseUrl + 'Orders/PaymentDetails', PaymentDetails);
  }
}
