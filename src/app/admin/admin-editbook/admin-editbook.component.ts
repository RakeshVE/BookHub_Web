import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookserviceService } from 'src/app/services/books.service';
import { BookDetails } from 'src/app/shared/data/BookDetails';



@Component({
  selector: 'app-admin-editbook',
  templateUrl: './admin-editbook.component.html',
  styleUrls: ['./admin-editbook.component.scss']
})
export class AdminEditbookComponent implements OnInit {
  addBook: FormGroup = new FormGroup({});
  name: string;
  bookDetails: BookDetails;
  isActive: any = true;
  userId: any;
  ItemId: any;
  ourFile: File;
  constructor(private fb: FormBuilder, private bookService: BookserviceService,
    private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('mnd:uid'));
    this.ItemId = this.activateRoute.snapshot.paramMap.get('id');
    this.getBookById();
    this.addBook = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(10)]],
      producttype: [null, [Validators.required]],
      menuid: [null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
      contenttype: [null, [Validators.required]],
      certification: [null, [Validators.required]],
      publisher: [null, [Validators.required]],
      details: [null],
      bookid: [null],
      demo: [null],
      description: [null],
      SystemReq: [null],
      ourprice: [null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
      listprice: [null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
      rating: [null, [Validators.required, Validators.minLength(1)]],



    });


  }
  getBookById() {
    const apiUrl: string = `books/GetBookById?id=${this.ItemId}&userId=${this.userId}`;
    this.bookService.getBookById(apiUrl).subscribe((data: any) => {
      this.bookDetails = data;
      // this.addBook.patchValue(this.bookDetails);

    })
  }
  openInput() {
    // your can use ElementRef for this later
    document.getElementById("fileInput").click();
  }
  fileChange(files: File[]) {

    if (files.length > 0) {
      this.ourFile = files[0];
      console.log("file ", this.ourFile);
    }
  }
  validateControl(controllerName: string) {
    debugger;
    if (this.addBook.get(controllerName)?.invalid && this.addBook.get(controllerName)?.touched) {
      return true
    } else { return false; }


  }
  errorHandling(control: string, error: string) {
    return this.addBook.controls[control].hasError(error);
  }


  updateDetails(form: any) {

    const formData = new FormData();
    formData.append('BookId', form.value.bookid);
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



    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
    this.bookService.editBook(formData).subscribe((data: any) => {
      console.log("", data);

      this.router.navigate(['/admin/BookList']);
    });
  }



}
