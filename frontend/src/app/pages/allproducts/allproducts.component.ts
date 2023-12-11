import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Book } from 'src/app/models/Book';
import { JsonPipe } from '@angular/common';
import { CommentService } from 'src/app/services/comment.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { animate, style, transition, trigger } from '@angular/animations';
// import { LocalStorageService } from 'angular-webstorage-service';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('0.2s ease-in', style({ opacity: 1 })),
]);
const fadeIn = trigger('fadeIn', [enterTransition]);
const exitTransition = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate('0.2s ease-out', style({ opacity: 0 })),
]);
const fadeOut = trigger('fadeOut', [exitTransition]);

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  // standalone: true,
  styleUrls: ['./allproducts.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class AllproductsComponent implements OnInit {
  constructor(
    private bookService: BookServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private commentService: CommentService,
    private snackBarService: SnackbarService,
    private checkoutService: CheckoutService
  ) {}
  listbook: Book[] = [];
  value = '';
  pageNum: number = 1;
  pageIndex: number = 1;
  itemInPage: number = 8;
  query: string = '';
  catid?: any = 0;

  CategoryList: any[] = [];
  toBookDetail(id: any) {
    this.router.navigate([`admin/detail/${id}`]);
  }

  setCat(index: null) {
    this.catid = index;
    this.router.navigate(['admin/search'], {
      queryParams: { q: this.value, cat: index },
    });
  }
  onSubmit() {
    console.log(this.value);
    this.query = this.value;
    this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    // this.router.navigate(['admin/search'], {
    //   queryParams: { q: this.value },
    // });
  }

  getCatName(id: any) {
    this.CategoryList.forEach((item) => {
      if (item.id == id) return item.tenchude;
      console.log(item);
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
      .getBookWithPageIndexPageSizeCatIdContent(this.pageIndex, this.itemInPage)
      .subscribe((item) => {
        console.log(item[0].imageData);

        this.listbook = item;
        console.log(this.listbook);
      });
  }
  setDataWithPageIndex(pageIndex: number, pageSize: number) {
    this.bookService
      .getBookWithPageIndexPageSizeCatIdContent(
        pageIndex,
        pageSize,
        this.catid,
        this.query,
        null
      )
      .subscribe((data) => {
        this.listbook = data;
      });
  }
  //========================HANDLE IMAG STUFF=================================
  getSafeImageUrl(base64: any): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  //==============================HANDLE PAGINATED = ===================
  //=============================BOOKID STUFF=========================
  convertToPaddedString(number: any) {
    // Chuyển số nguyên thành chuỗi
    let strNumber = number.toString();

    // Tính số lượng số 0 cần bù
    let zeroCount = 8 - strNumber.length;

    // Bù số 0 nếu cần
    while (zeroCount > 0) {
      strNumber = '0' + strNumber;
      zeroCount--;
    }

    return strNumber;
  }
  //=============================END OF BOOKID STUFF=========================
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
    console.log(this.cardList);
    console.log(item);

    this.cardList.push(item);
    console.log(this.cardList);
    this.saveDataToLocalStorage('card', this.cardList);
  }
  clearCard() {
    localStorage.setItem('card', '[]');
  }

  ///================Card handle====================
  // ===================handle delete book
  isConfirmWindowOpen = false;
  loading = false;
  deleteDone = false;
  bookToDelete: any;
  handleCloseAll() {
    if (!this.loading) {
      this.isConfirmWindowOpen = false;
      this.bookToDelete = null;
    }
  }
  startDelete(item: any) {
    this.isConfirmWindowOpen = true;
    this.bookToDelete = item;
    console.log(item);
  }
  spinDisk = false;
  handleDelete() {
    this.loading = true;
    this.spinDisk = true;
    console.log(this.bookToDelete.id);

    this.commentService.deleteWithBookId(this.bookToDelete.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        if (e.status == 200)
          this.snackBarService.showSuccess('Xóa Thành công comment');
        this.checkoutService
          .deleteRequestWithBookId(this.bookToDelete.id)
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (e) => {
              console.log(e);
              if (e.status == 200)
                this.snackBarService.showSuccess('Xóa Thành công phiếu');
              this.bookService.delete(this.bookToDelete.id).subscribe({
                next: (data) => {
                  console.log(data);
                  this.deleteDone = true;
                  this.loading = false;
                  this.snackBarService.showSuccess('xóa hoàn tất');
                  this.loadData();
                },
                error: (e) => {
                  console.log(e);

                  if (e.status == 200) {
                    this.deleteDone = true;
                    this.snackBarService.showSuccess('xóa hoàn tất');
                    this.loadData();
                  }
                },
              });
            },
          });
      },
    });
  }

  // ======================end of handle delete book

  ngOnInit(): void {
    this.cardList = this.getData('card');
    console.log(this.getData('card'));
    this.loadData();
    this.getListCat();
    this.route.queryParams.subscribe((queryParams) => {
      console.log('called');

      this.query = queryParams['q'];
      this.catid = queryParams['cat'];
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    });
  }
}
