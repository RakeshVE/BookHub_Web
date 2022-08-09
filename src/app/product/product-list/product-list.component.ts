import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookserviceService } from 'src/app/services/books.service';
import { MenuService } from 'src/app/services/menu.service';
import { BookDetails } from 'src/app/shared/data/BookDetails';
import { filterParams } from 'src/app/shared/data/filterParams';
import { productsDB } from '../../shared/data/products';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products = [];
  bookData: BookDetails[] = [];
  menuList = [];
  booksBySubMenu = [];
  ITMenu = [];
  ProfMenu = [];
  subMenuSelected: any;
  certifications: any = [];
  contentType: any = [];
  publishers: any = [];
  priceRange: any = [];
  filterParams: filterParams;
  form: FormGroup;

  constructor(
    private bookService: BookserviceService,
    private menuService: MenuService,
    private formBuilder: FormBuilder
  ) {}

  // Pagination
  totalLength: any;
  page: number = 1;

  ngOnInit(): void {
    setTimeout(() => {
      this.products = productsDB.Product;
      this.isLoaded = true;
    }, 1000);
    this.getAllBooks();
    this.getMenuList();
    this.getITSubMenu();
    this.getProfSubMenu();
    this.bindDropdown();
    this.filterForm();
  }

  filterForm() {
    this.form = this.formBuilder.group({
      contentType: [''],
      publishers: [''],
      certifications: [''],
      priceRange: ['']
    });
  }

  getAllBooks() {
    debugger;
    this.subMenuSelected = '';
    this.bookService.getBooks().subscribe((data: any) => {
      this.bookData = data;
      this.bindDropdown();
      //this.form.reset();
      console.log('Bookdata', this.bookData);
      this.totalLength = data.length;
    });
  }

  //menu name displayed hard-coded in HTML
  getMenuList() {
    this.menuService.getMenuList().subscribe((data: any) => {
      this.menuList = data;
      console.log('Menu List', this.menuList);
    });
  }

  getBooksbySubMenu() {
    // to be made dynamic by selecting from dropdown
    this.subMenuSelected = 'AWS';
    this.menuService.getBooksBySubMenu(this.subMenuSelected).subscribe((data: any) => {
      this.booksBySubMenu = data;
      console.log('Books under', this.subMenuSelected, 'are :', this.booksBySubMenu);
    });
  }

  //get sub menu list for menus hard-coded
  getITSubMenu() {
    this.menuService.getSubMenuList('IT CERTIFICATIONS').subscribe((data: any) => {
      this.ITMenu = data;
      console.log('IT Sub Menu', this.ITMenu);
    });
  }

  getProfSubMenu() {
    this.menuService.getSubMenuList('PROFESSIONAL CERTIFICATIONS').subscribe((data: any) => {
      this.ProfMenu = data;
      console.log('Prof Sub Menu', this.ProfMenu);
    });
  }

  show(menu: string) {
    this.subMenuSelected = menu;
    console.log('Selected sub menu', this.subMenuSelected);
    this.menuService.getBooksBySubMenu(this.subMenuSelected).subscribe((data: any) => {
      this.bookData = data;
      this.bindDropdown();
      this.searchByBookName(this.subMenuSelected);
    });
  }
  bindDropdown() {
    const apiUrl = 'Books/BindDropdown?menuName=';
    this.bookService.bindDropDown(this.subMenuSelected, apiUrl).subscribe((data: any) => {
      this.certifications = data.certifications;
      this.contentType = data.contentType;
      this.publishers = data.publishers;
      this.priceRange = ['10 to 50', '50 to 100', '100 to 200', '200 to 300'];
      console.log('filterData:', data);
    });
  }

  applyFilter() {
    debugger;
    this.bookService.applyFilter(this.form.value).subscribe((data: any) => {
      console.log('Shipping Details Added', data);
      this.bookData = data;
    });
  }

  searchByBookName(bookName: string) {
    debugger;
    if (bookName == '' || bookName == undefined) {
      this.getAllBooks();
    } else {
      this.bookService.searchBook(bookName).subscribe((data: any) => {
        this.bookData = data;
      });
    }
  }
}
