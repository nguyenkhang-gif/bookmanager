import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  list: Book[] = [];
  ogList: Book[] = [];
  pageNum: number = 1;
  pageIndex: number = 1;
  itemsToRepeat = new Array(0);

  constructor(
    private service: BookServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  handleClickOnIndex(index: number) {
    console.log('this is the index:', index);
    this.service.getBookWithIndexPageAndPageSize(index, 3).subscribe({
      next: (list) => {
        console.log(list);
        this.list = list;
      },
    });
  }
  
  isSpecificUrl(url: string): boolean {
    // Check the current URL or parameters to determine if it matches a specific condition.
    const currentUrl = this.router.url;
    // You can also use ActivatedRoute to access route parameters.
    // const paramValue = this.route.snapshot.params['paramName'];

    // Example: Check if the URL contains '/specific-path'
    return currentUrl.includes(`/${url}`);
  }

  cate: string = 'Initial Category';

  // constructor(private router: Router, private route: ActivatedRoute) { }

  handleChildSearchchange() {
    console.log('cate:', this.cate);
  }

  ngOnInit(): void {
    this.service.getBooks().subscribe({
      next: (item) => {
        this.list = item;
        this.ogList = item;
        // console.log(this.list);
        this.pageNum = this.ogList.length;
        this.itemsToRepeat = new Array(this.pageNum);
        this.service
          .getBookWithIndexPageAndPageSize(this.pageIndex, 3)
          .subscribe({
            next: (list) => {
              // console.log(list);
              this.list = list;
            },
          });
      },
      error: (e) => {
        console.log('error', e);
      },
    });
    // console.log(this.list.length)
  }
}
