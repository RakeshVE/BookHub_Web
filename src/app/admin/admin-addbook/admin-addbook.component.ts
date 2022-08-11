import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookserviceService } from 'src/app/services/books.service';

@Component({
  selector: 'app-admin-addbook',
  templateUrl: './admin-addbook.component.html',
  styleUrls: ['./admin-addbook.component.scss']
})
export class AdminAddbookComponent implements OnInit {
  addBook: FormGroup=new FormGroup({});
  name:string;
  isActive:any=true;
  userId : any;
  ourFile: File; 
  constructor(private fb:FormBuilder,private bookService:BookserviceService ) { }

  ngOnInit(): void {
    this.userId=parseInt(localStorage.getItem('mnd:uid'));
    this.addBook = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(10)]],
      producttype: [null, [Validators.required]],
      menuid: [null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
      contenttype: [null, [Validators.required]],
      certification: [null, [Validators.required]],
      publisher: [null, [Validators.required]],
      details: [null],
      demo: [null],
      description: [null ],
      SystemReq: [null],
      ourprice: [null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
      listprice: [null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
      rating: [null, [Validators.required, Validators.minLength(1)]],
      
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      
      image: [null],

    
    });
  }
  openInput(){ 
    // your can use ElementRef for this later
    document.getElementById("fileInput").click();
  }
  fileChange(files: File[]) {
    debugger;
    if (files.length > 0) {
      this.ourFile = files[0];
      console.log("file ",this.ourFile);
    }
  }
  validateControl(controllerName:string){
    
        if(this.addBook.get(controllerName)?.invalid && this.addBook.get(controllerName)?.touched){
          return true
        }else
        {return false;}
        
    
      }
      errorHandling(control:string,error:string)
      {
        return this.addBook.controls[control].hasError(error);
      }
 
  saveDetails(form: any) {
debugger;
    const formData = new FormData();
    formData.append('BookId', this.userId);
    formData.append('Title', form.value.title);
    formData.append('Image', form.value.image);
    formData.append('ListPrice', form.value.listprice);
    formData.append('OurPrice', form.value.ourprice);
    formData.append('Rating', form.value.rating);
    formData.append('ReviewCount', form.value.ourprice);
    formData.append('Details', form.value.details);
    formData.append('ProductType', form.value.producttype);
    formData.append('Description', form.value.description);
    formData.append('SystemReq', form.value.SystemReq);
    formData.append('Demo', form.value.demo);
    formData.append('IsActive', this.isActive);
    formData.append('MenuId', form.value.menuid);
    formData.append('ContentType', form.value.contenttype);
    formData.append('Certification', form.value.certification);
    formData.append('Publisher', form.value.publisher);
    formData.append('CreatedBy', this.userId);
    formData.append('WishlistAdded', this.isActive);
    formData.append('Publisher', form.value.publisher);
    formData.append('CreatedBy', this.userId);
    formData.append('Photo', this.ourFile);
 

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
    this.bookService.AddBook(formData).subscribe((data:any)=>{
      console.log("",data);

    })

  }
}