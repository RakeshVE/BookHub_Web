import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  productList = [];
  ItemId: any;
  TotalPrice: number;
  userId: any;
  prcChkOut: boolean = true;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    debugger
    this.userId = parseInt(localStorage.getItem('mnd:uid'));
    // this.ItemId = this.route.snapshot.paramMap.get('id');
    this.ItemId = this.route.paramMap
      .pipe(map(() => window.history.state))
    this.UserProductList();

  }
  UserProductList() {
    let userId = this.userId;
    // this.userService.GetItemToCart(userId).subscribe(

    //   data => {
    //     debugger
    //     this.productList=data;
    //   //  for(var i=0;i<=this.productList.le)
    //   //  let parentChecked = data.checked;
    //     this.productList.forEach(obj => {
    //        obj.forEach(childObj=> {
    //         if(this.TotalPrice!=null){
    //           this.TotalPrice = ++this.productList.cartTotal;
    //         }else{
    //           this.TotalPrice = this.productList.cartTotal;
    //         }


    //       });
    //    });
    //    for(var obj in this.productList)
    //   {
    //     if(this.TotalPrice!=null){
    //       this.TotalPrice = ++obj;
    //     }else{
    //       this.TotalPrice = this.productList.cartTotal;
    //     }
    //   }
    //   },
    //   error => {
    //   }
    // )
    this.userService.GetItemToCart(userId).subscribe((data: any) => {
      debugger
      this.TotalPrice = 0;
      this.productList = data;
      console.log('Cart Details', this.productList);
      for (var i = 0; i < this.productList.length; i++) {
        if (this.TotalPrice != null && this.TotalPrice != 0 && this.TotalPrice != undefined) {
          this.TotalPrice = this.TotalPrice + this.productList[i].cartTotal;
        } else {
          this.TotalPrice = this.productList[i].cartTotal;;
        }
      }
    })
  }
  RemoveToCart(Id: any) {
    const Item = {
      BookId: Id,
      UserId: this.userId,
      // Quantity:1,
      // CartTotal:this.bookDetails.ourPrice,
      // DiscountPer:0,
      // NetPay:this.bookDetails.ourPrice,

    };
    this.userService.RemoveToCart(Item).subscribe(

      data => {
        debugger
        this.UserProductList();
      },
      error => {
      }
    )
  }
  EmptyToCart() {

    this.userService.EmptyToCart(this.userId).subscribe(

      data => {
        debugger
        this.UserProductList();
      },
      error => {
      }
    )
  }

  UpdateCart(Data: any, Qty: any) {
    debugger
    if (Qty.value == "0") {
      alert('Quantity should be greater then 0.')
      Qty.value = 1;
    }
    else {
      const Item = {
        CartId: Data.cartId,
        BookId: Data.bookId,
        UserId: this.userId,
        Quantity: Qty.value,
        // CartTotal:this.bookDetails.ourPrice,
        // DiscountPer:0,
        // NetPay:this.bookDetails.ourPrice,

      };
      this.userService.UpdateCart(Item).subscribe(

        data => {
          debugger
          // this.productList=data;
          this.UserProductList();
        },
        error => {
        }
      )
    }
  }

  CheckOut(totalPrice: any) {
    debugger;
    //this.route.navigate(['/cart'],this.ItemId);
    //  this.userService.checkOut(totalPrice).subscribe(
    //   data => {
    //     console.log('Cart Checkout Data', data);
    //     this.router.navigate(['/Review/order-review']);
    //    // this.route.navigate(['/cart'],{state : {data : {id}}})
    //   },
    //   error => {
    //   }
    // )
    this.router.navigate(['/Review/order-review']);
  }
  resolved(captchaResponse: string) {
    this.prcChkOut = false;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
