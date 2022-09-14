import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { UserService } from '../services/user.service';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddToCartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  providers: [UserService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LfuiNwhAAAAABlFFuMAICW1gVCgaQhfQbhBDJvB',
      } as RecaptchaSettings,
    }]
})
export class CartModule { }
