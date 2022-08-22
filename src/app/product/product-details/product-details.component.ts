import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { GalleryItem,ImageItem  } from 'ng-gallery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router,ActivatedRoute } from '@angular/router';
import { ImageDetails } from 'src/app/shared/data/ImageDetails';
import { BookDetails } from 'src/app/shared/data/BookDetails';
import { BookserviceService } from 'src/app/services/books.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { addWishlist } from 'src/app/shared/data/addWishlist';

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  
  
})
export class ProductDetailsComponent implements OnInit {
  imageDetails:ImageDetails ;
  bookDetails:BookDetails;
  discount:number;
  perDiscount:number;
  showDiscountValue: boolean = false;
  myDate = new Date();
  errorMessage: any;
  wishListAdded: boolean;
  quantity:number;
 // images: GalleryItem[];
 ItemId:any;
 result:any;
 userId:any;
  constructor(private _http:HttpClient,private activateRoute:ActivatedRoute,
    private bookService:BookserviceService,private route:Router,private userService:UserService,private datePipe:DatePipe) { }

  ngOnInit() {
    this.ItemId = this.activateRoute.snapshot.paramMap.get('id');
    this.userId=parseInt(localStorage.getItem('mnd:uid'));
   //this.getBookImageById();
   
    
   this.getBookImageById();
    this.bookDetailById();
    
    
  }

  getBookImageById(){
    debugger;   
    const id = this.activateRoute.snapshot.paramMap.get('id');
    const apiUrl:string=`books/GetBookImage?bookid=${id}`;

    this.bookService.getImageById(apiUrl).subscribe((data:any)=>{
      this.imageDetails=data;
       
    })
   

  }
  bookDetailById(){
    debugger;   
    const id = this.activateRoute.snapshot.paramMap.get('id');
    const apiUrl:string=`books/GetBookById?id=${id}&userId=${this.userId}`;

    this.bookService.getBookById(apiUrl).subscribe((data:any)=>{
      this.bookDetails=data;
      console.log(this.bookDetails);  
      if(this.bookDetails.listPrice != this.bookDetails.ourPrice){
        this.showDiscountValue = true;
      }
      if(this.bookDetails.wishlistAdded==true){
        this.wishListAdded=true;
      }
      this.discount=this.bookDetails.listPrice-this.bookDetails.ourPrice
      this.perDiscount=Math.round((this.discount/this.bookDetails.listPrice)*100);
    
  })
}
addToWishlist(bookId){
  
  const id = this.activateRoute.snapshot.paramMap.get('id');
  const wishlisItem:addWishlist={
    bookId:Number(id),
    userId:this.userId,
    isLiked:true,
    createdOn:this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
    createdBy:1
  }
  
  debugger;
    const apiUrl:string=`Orders/AddBookToWishlist`;

    this.bookService.addBooktowishlist(apiUrl,wishlisItem).subscribe({
      next:(owner:addWishlist)=>{
        const Status="Succesfully added to wishlist.";
        this.wishListAdded=true;
        

      },
      error:()=>{
        
        this.errorMessage="Error Occured"//this.errorHandler.errorMessage;
      }
    });

}
AddToCart(){
  debugger
  if(this.userId==undefined||this.userId==null||this.userId==''||this.userId==NaN){
    alert('please login');
    this.route.navigate(['/auth/login']);
    return;
  }
  if (Number.isNaN(this.userId)) {
    alert('please login');
    this.route.navigate(['/auth/login']);
    return;
  }
  var id=this.ItemId;
  const Item = {
    BookId:this.ItemId,
    UserId: this.userId,
    Quantity:this.quantity!=null?this.quantity:1,
    CartTotal:this.bookDetails.listPrice,
    DiscountPer:this.perDiscount,
    NetPay:this.bookDetails.ourPrice,

  };
  //this.route.navigate(['/cart'],this.ItemId);
 this.userService.AddToCart(Item).subscribe(
     
  data => {
    debugger;
   alert("Book add to cart sucessfully");
    //this.route.navigate(['/cart']);
   
  },
  error => {
  }
)
  
}
UpdateQty(Qty:any){
  if(Qty.value=="0"){
    alert('Quantity should be greater then 0.')
    Qty.value=1;
    this.quantity=1;
      }
      else{
this.quantity=Qty.value;
      }
}
}
