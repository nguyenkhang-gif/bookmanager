import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Book } from 'src/app/models/Book';
// import { LocalStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  // standalone: true,
  styleUrls: ['./allproducts.component.scss'],
})
export class AllproductsComponent implements OnInit {
  constructor(
    private bookService: BookServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer // private localStorage: LocalStorageService
  ) {}
  listbook: Book[] = [];
  value = '';
  pageNum: number = 1;
  pageIndex: number = 1;
  itemInPage: number = 8;
  query: string = '';
  catid?: number = 0;
  CategoryList: any[] = [];
  toBookDetail(id: any) {
    this.router.navigate([`admin/detail/${id}`]);
  }

  setCat(index: number) {
    this.router.navigate(['admin/search'], {
      queryParams: { q: this.value, cat: index },
    });
  }
  onSubmit() {
    console.log(this.value);
    this.router.navigate(['admin/search'], {
      queryParams: { q: this.value },
    });
  }

  getListCat() {
    this.bookService.getAllCatgory().subscribe({
      next: (list) => {
        console.log(list);

        this.CategoryList = list;
      },
    });
  }
  loadData() {
    this.bookService
      .getBookWithIndexPageAndPageSize(this.pageIndex, this.itemInPage)
      .subscribe((item) => {
        console.log(item[0].imageData);

        this.listbook = item;
        console.log(this.listbook);
      });
  }
  setDataWithPageIndex(pageIndex: number, pageSize: number) {
    if (
      (this.query == null || this.query == '') &&
      this.catid != 0 &&
      this.catid != null
    ) {
      // console.log('handle only catid:', this.catid);
      this.bookService
        .getBookWithPageIndexPageSizeCatId(pageIndex, pageSize, this.catid)
        .subscribe({
          next: (list) => {
            // console.log(list);
            this.listbook = list;
          },
        });
    } else if (this.query != null && (this.catid == 0 || this.catid == null)) {
      // console.log('handle query only:', this.query);
      this.bookService
        .getBookWithPageIndexPageSizeCatIdContent(
          pageIndex,
          pageSize,
          0,
          this.query
        )
        .subscribe({
          next: (list) => {
            // console.log('search with query: ', list);

            this.listbook = list;
            // this.checkifnotfound();
          },
        });
    } else if (
      this.query != null &&
      this.query != '' &&
      this.catid != 0 &&
      this.catid != null
    ) {
      this.bookService
        .getBookWithPageIndexPageSizeCatIdContent(
          pageIndex,
          pageSize,
          this.catid,
          this.query
        )
        .subscribe({
          next: (list) => {
            // console.log(list);
            this.listbook = list;
            // this.checkifnotfound();
          },
          error: (e) => {
            // console.log(e);
          },
        });
    } else {
      this.bookService
        .getBookWithIndexPageAndPageSize(pageIndex, pageSize)
        .subscribe({
          next: (list) => {
            this.listbook = list;
          },
        });
    }
  }
  //========================HANDLE IMAG STUFF=================================
  getSafeImageUrl(base64: any): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  //==============================HANDLE PAGINATED = ===================

  handleNextBefore(method: string) {
    if (method == '+' && this.listbook.length) {
      this.pageIndex++;
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
    if (method == '-' && this.pageIndex > 1) {
      this.pageIndex--;
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
  }

  ///================Card handle====================
  cardList: any[] = [];
  saveDataToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
  getData(key: any) {
    return JSON.parse(localStorage.getItem(key)!);
  }
  addToCard(item: any) {
    this.cardList.push(item);
    console.log(this.cardList);
    this.saveDataToLocalStorage('card', this.cardList);
  }
  clearCard(){
    localStorage.setItem("card","[]")
  } 
  
   ///================Card handle====================

  ngOnInit(): void {
    this.cardList = this.getData('card');
    this.loadData();
    this.getListCat();
    this.route.queryParams.subscribe((queryParams) => {
      this.query = queryParams['q'];
      this.catid = queryParams['cat'];
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    });
  }
}
