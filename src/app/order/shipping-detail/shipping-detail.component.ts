import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-shipping-detail',
  templateUrl: './shipping-detail.component.html',
  styleUrls: ['./shipping-detail.component.scss']
})
export class ShippingDetailComponent implements OnInit {
  shippingDetails: FormGroup;
  checkoutId: any;
  payAmount: any;
  form = new FormGroup({
    paymentRadion: new FormControl('', Validators.required)
  });
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private orderService: OrdersService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.checkoutId = params['chkoutId'];
      this.payAmount = params['payAmount'];

    });
    this.buildForm();
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
  validateControl(controllerName: string) {

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
  get f() {
    return this.form.controls;
  }
  paynow() {
    debugger
    if (this.shippingDetails.invalid) {
      this.shippingDetails.markAllAsTouched();
    } else {
      this.addShippingDetails()
      this.router.navigate(['/Review/payment'], { queryParams: { chkoutId: this.checkoutId, payAmount: this.payAmount } });



      // this.formValue = this.form.value
      // console.log("formValue", this.formValue);
      // if (this.formValue.paymentRadion == 'razorpay') {
      //   this.makePayment();
      // }

      // else if (this.formValue.paymentRadion == 'stripe') {
      //   this.checkout();
      // }
      // else if (this.formValue.paymentRadion == 'paypal') {
      //   this.paywithpaypal();
      // }
    }
  }
  addShippingDetails() {
    this.shippingDetails.controls['CheckoutId'].setValue(this.checkoutId);
    this.orderService.addShippingDetails(this.shippingDetails.value).subscribe((data: any) => {
      console.log('Shipping Details Added', data);
      this.shippingDetails.reset();
    });
  }
}
