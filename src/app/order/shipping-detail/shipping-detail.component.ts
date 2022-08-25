import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-detail',
  templateUrl: './shipping-detail.component.html',
  styleUrls: ['./shipping-detail.component.scss']
})
export class ShippingDetailComponent implements OnInit {
  shippingDetails: FormGroup;
  form = new FormGroup({
    paymentRadion: new FormControl('', Validators.required)
  });
  constructor() { }

  ngOnInit(): void {
  }
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
}
