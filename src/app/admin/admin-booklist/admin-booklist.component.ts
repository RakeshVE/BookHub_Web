import { Component, OnInit } from '@angular/core';
import { BookDetails } from 'src/app/shared/data/BookDetails';
import { BookserviceService } from 'src/app/services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-booklist',
  templateUrl: './admin-booklist.component.html',
  styleUrls: ['./admin-booklist.component.scss']
})
export class AdminBooklistComponent implements OnInit {
  bookData: BookDetails[] = [];
  p: number = 1;
  first = 0;
  rows = 10;
  isActive: any;
  constructor(private bookService: BookserviceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  public updateBook = (id) => {
    debugger;
    const updateUrl: string = '/adimn/EditBook';
    this.router.navigate([updateUrl]);
  }
  getAllBooks() {

    this.bookService.getAllBooks().subscribe((data: any) => {
      this.bookData = data;
      this.isActive = data.isActive;
      console.log('Bookdata', this.bookData);
    })
  }
  setStatus(bookId: any) {
    debugger;
    this.bookService.setStatus(bookId).subscribe((data: any) => {
      this.bookData = data;
      this.isActive = data.isActive;
      console.log('Bookdata', this.bookData);
    })
  }

}
