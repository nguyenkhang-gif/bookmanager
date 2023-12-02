import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  booleanAttribute,
} from '@angular/core';
import { ActivatedRoute, Route, Router, TitleStrategy } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { BookServiceService } from 'src/app/services/book-service.service';
import { ImageService } from 'src/app/services/image.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  list: Book[] = [];
  ogList: Book[] = [];
  pageNum: number = 1;
  pageIndex: number = 1;
  itemInPage: number = 8;
  itemsToRepeat = new Array(0);
  query: string = '';
  catid?: number = 0;
  notFound = false;
  tempimageurl = '../../../assets/books/sach 1.jpg';

  constructor(
    private service: BookServiceService,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService
  ) {}

  reloadPage() {
    location.reload();
  }

  isSpecificUrl(url: string): boolean {
    const currentUrl = this.router.url;
    return currentUrl.startsWith(`${url}`);
  }

  handleNextBefore(method: string) {
    if (method == '+' && this.list.length) {
      this.pageIndex++;
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
    if (method == '-' && this.pageIndex > 1) {
      this.pageIndex--;
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
  }

  getSafeImageUrl(base64: any) {
    return this.imageService.getSafeImageUrl(base64);
  }

  checkifnotfound() {
    if (this.list.length == 0) {
      this.notFound = true;
    } else {
      this.notFound = false;
    }
  }

  setDataWithPageIndex(pageIndex: number, pageSize: number) {
    console.log(this.catid);
    console.log(this.query);
    this.service
      .getBookWithPageIndexPageSizeCatIdContent(
        pageIndex,
        pageSize,
        this.catid,
        this.query,
        null
      )
      .subscribe({
        next: (data) => {
          this.list = data;
        },
        error: (e) => {
          console.log(e);
        },
      });

    // if (
    //   (this.query == null || this.query == '') &&
    //   this.catid != 0 &&
    //   this.catid != null
    // ) {
    //   // console.log('handle only catid:', this.catid);
    //   this.service
    //     .getBookWithPageIndexPageSizeCatId(pageIndex, pageSize, this.catid)
    //     .subscribe({
    //       next: (list) => {
    //         // console.log(list);
    //         this.list = list;
    //       },
    //     });
    // } else if (this.query != null &&this.query!='' && (this.catid == 0 || this.catid == null)) {
    //   console.log('handle query only:', this.query);
    //   this.service
    //     .getBookWithPageIndexPageSizeCatIdContent(
    //       pageIndex,
    //       pageSize,
    //       this.catid,
    //       this.query
    //     )
    //     .subscribe({
    //       next: (list) => {
    //         console.log('search with query: ', list);

    //         this.list = list;
    //         this.checkifnotfound();
    //       },
    //     });
    // } else if (
    //   this.query != null &&
    //   this.query != '' &&
    //   this.catid != 0 &&
    //   this.catid != null
    // ) {
    //   this.service
    //     .getBookWithPageIndexPageSizeCatIdContent(
    //       pageIndex,
    //       pageSize,
    //       this.catid,
    //       this.query
    //     )
    //     .subscribe({
    //       next: (list) => {
    //         // console.log(list);
    //         this.list = list;
    //         this.checkifnotfound();
    //       },
    //       error: (e) => {
    //         // console.log(e);
    //       },
    //     });
    // } else {
    //   console.log("called");

    //   this.service
    //     .getBookWithIndexPageAndPageSize(pageIndex, pageSize)
    //     .subscribe({
    //       next: (list) => {
    //         console.log(list);
    //         this.list = list;
    //         this.checkifnotfound();
    //       },
    //       error: () => {
    //         this.checkifnotfound();
    //       },
    //     });
    // }
   
  }

  ngOnInit(): void {
    if (this.isSpecificUrl('/search')) {
      this.itemInPage = 8;
    }

    this.titleService.setTitle('home');
    // this.pageIndex=1
    //get the fk query
    this.route.queryParams.subscribe((queryParams) => {
      console.log('this is route for query');
      this.query = queryParams['q'];
      this.catid = queryParams['cat'];

      // console.log("query:",this.query)
      // this.getDataWithQuery(this.query, this.catid ? this.catid : 0);
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    });
    // console.log(this.query)
    if (!this.isSpecificUrl('search'))
      this.setDataWithPageIndex(1, this.itemInPage);
  }
  ngOnDestroy(): void {
    console.log('destroy called');
  }
}
