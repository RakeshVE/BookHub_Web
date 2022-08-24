import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { variable } from '@angular/compiler/src/output/output_ast';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

declare var Razorpay: any;
@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {
  userId: any; // passed hard-coded to be retrieved from local storage
  TotalPrice: any;
  productList: any = [];
  taxData: any = [];
  checkoutId: any;
  bookIds: any = [];
  message: any = 'Not yet stared';
  paymentId = '';
  error = '';
  title = 'MindHub Payment';
  options = {
    key: 'rzp_test_lQiahq5iON2wZj',
    amount: '' as unknown,
    name: 'Mind Hub',
    description: 'The Certificate Prep Store.',
    // image: 'ser',
    order_id: '',
    currency: 'INR',
    handler: function (response: any) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: '',
      email: '',
      contact: ''
    },
    notes: {
      address: ''
    },
    theme: {
      color: '#3399cc'
    }
  };
  finalPay: any;
  shippingDetails: FormGroup;
  form = new FormGroup({
    paymentRadion: new FormControl('', Validators.required)
  });
  formValue: any;
  constructor(
    private userService: UserService,
    private orderService: OrdersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  //Reference for paypal integration
  @ViewChild('paypalRef', { static: true }) private paypalRef: ElementRef;

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('mnd:uid'));
    this.buildForm();
    this.getCartDetails();

  }

  buildForm() {
    this.shippingDetails = this.formBuilder.group({
      CheckoutId: [''],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      Country: ['', Validators.required],
      ZipCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      Phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      AddressType: ['', Validators.required]
    });
  }

  //   shippingDetails = new FormGroup({
  //   CheckoutId: new FormControl(),
  //   FirstName: new FormControl('', Validators.required),
  //   LastName: new FormControl('', Validators.required),
  //   Address: new FormControl('', Validators.required),
  //   City: new FormControl('', Validators.required),
  //   State: new FormControl('', Validators.required),
  //   Country: new FormControl('', Validators.required),
  //   ZipCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  //   Phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  //   AddressType: new FormControl('', Validators.required),
  // })
  validateControl(controllerName: string) {
    debugger;
    if (this.shippingDetails.get(controllerName)?.invalid && this.shippingDetails.get(controllerName)?.touched) {
      return true;
    }
    else if (controllerName == 'paymentRadion') {
      if (this.form.get(controllerName)?.invalid && this.form.get(controllerName)?.touched) {
        return true;
      }
    }
    else {
      return false;
    }

  }
  errorHandling(control: string, error: string) {
    return this.shippingDetails.controls[control].hasError(error);
  }
  getCartDetails() {
    this.userService.GetItemToCart(this.userId).subscribe((data: any) => {
      debugger;
      this.TotalPrice = 0;
      this.productList = data;
      for (var i = 0; i < this.productList.length; i++) {
        this.bookIds.push(this.productList[i].bookId);

        if (this.TotalPrice != null && this.TotalPrice != 0 && this.TotalPrice != undefined) {
          this.TotalPrice = this.TotalPrice + this.productList[i].cartTotal;
        } else {
          this.TotalPrice = this.productList[i].cartTotal;
        }
      }
      console.log('Cart Details', this.productList, 'Total Price', this.TotalPrice);
      console.log('Book Ids array', this.bookIds);
      this.calculateTax();
    });
  }

  calculateTax() {
    this.orderService.createCheckout(this.TotalPrice, this.userId).subscribe((data: any) => {
      this.taxData = data;
      this.checkoutId = this.taxData.checkoutId;
      this.finalPay = this.taxData.finalPay;
      console.log('Tax Calculated Data', this.taxData);
    });
  }

  makePayment() {
    if (this.shippingDetails.invalid) {
      this.shippingDetails.markAllAsTouched();
    } else {
      this.paymentId = '';
      this.error = '';
      this.options.amount = this.finalPay * 100;
      this.options.prefill.name = '';
      this.options.prefill.email = 'userdemo@gmail.com';
      this.options.prefill.contact = '123456789';
      var rzp1 = new Razorpay(this.options);
      rzp1.open();
      rzp1.on('payment.failed', function (response: any) {
        //this.message = "Payment Failed";
        // Todo - store this information in the server
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
        //this.error = response.error.reason;
      });
      // console.log('Payment Amount', this.taxData.finalPay);
      // console.log('Shipping Details', this.shippingDetails.value);
    }
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = 'Success Payment';
    console.log('Payment message', this.message);

    if (this.message == 'Success Payment') {
      // save payment details into payments table
      // generate payment reciept and pass order id and payment details into it.
      this.afterPayments();
    }
  }
  afterPayments() {
    this.addShippingDetails();
    this.addOrderDetails(this.bookIds, this.userId, this.checkoutId);
    this.emptyCart();

    if (confirm('Payment made successfully !')) {
      this.router.navigate(['/products']);
    }
  }
  addShippingDetails() {
    this.shippingDetails.controls['CheckoutId'].setValue(this.checkoutId);
    this.orderService.addShippingDetails(this.shippingDetails.value).subscribe((data: any) => {
      console.log('Shipping Details Added', data);
      this.shippingDetails.reset();
    });
  }

  addOrderDetails(bookIds: any, userId: any, checkoutId: any) {
    this.orderService.addOrderDetails(bookIds, userId, checkoutId).subscribe((data: any) => {
      console.log('Orders Data added successfully', data);
    });
  }

  emptyCart() {
    this.userService.EmptyToCart(this.userId).subscribe();
  }

  checkout() {
    debugger;
    if (this.shippingDetails.invalid) {
      this.shippingDetails.markAllAsTouched();
    } else {
      this.stripeCheckout(
        'Book',
        this.finalPay * 100,
        (token: any) => this.takePayment('Book', this.finalPay * 100, token)
        // this.tokenDetails=token;
        //console.log("token",token)
      );
    }
  }

  takePayment(productName: string, amount: number, token: any) {
    debugger;
    console.log('token', token);
    let body = {
      tokenId: token.id,
      productName: productName,
      amount: amount,
      email: token.email,
      card_expMonth: token.card.exp_month,
      card_expYear: token.card.exp_year,
      card_id: token.card.id
    };
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    this.orderService.stripePayments(body).subscribe((res: any) => {
      console.log('Stripe Result ', res);
    });
    this.afterPayments();
  }

  paywithpaypal() {
    if (this.shippingDetails.invalid) {
      this.shippingDetails.markAllAsTouched();
    } else {
      this.addOrderDetails(this.bookIds, this.userId, this.checkoutId);
      this.router.navigate(['/Review/paypal']);
      this.emptyCart();
    }
  }

  stripeCheckout(productName: string, amount: number, tokenCallback) {
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LLNGNSBVnjJH0yCQcL6tPtycsmOKoln5rOHPgzy1aM7RZjwLtet1Nul9BbnA2v71chpKvBBp2WjLG7n62Dxm5LU002lP0BIKB',
      locale: 'auto',
      token: tokenCallback
    });

    handler.open({
      name: 'Book Shop',
      description: productName,
      zipCode: false,
      currency: 'inr',
      amount: amount,
      panelLabel: 'Pay {{amount}}',
      allowRememberMe: false
    });
  }
  get f() {
    return this.form.controls;
  }
  paynow() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.formValue = this.form.value
      console.log("formValue", this.formValue);
      if (this.formValue.paymentRadion == 'razorpay') {
        this.makePayment();
      }

      else if (this.formValue.paymentRadion == 'stripe') {
        this.checkout();
      }
      else if (this.formValue.paymentRadion == 'paypal') {
        this.paywithpaypal();
      }
    }
  }
}
