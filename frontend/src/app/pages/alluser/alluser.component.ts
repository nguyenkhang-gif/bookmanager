import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.scss'],
})
export class AlluserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private bookService: BookServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  query: string = '';
  value = '';
  pageNum: number = 1;
  pageIndex: number = 1;
  itemInPage: number = 8;
  listUser: any[] = [];
  getSafeImageUrl(item: any) {
    return this.bookService.getSafeImageUrl(item);
  }
  onSubmit() {
    console.log(this.value);
    this.router.navigate(['admin/searchuser'], {
      queryParams: { q: this.value },
    });
  }

  //==============Handle data and query stuff=========================
  setDataWithPageIndex(pageIndex: number, pageSize: number) {
    console.log(this.value);

    if (this.query != '' && this.query != null) {
      this.userService
        .getUserWithPageIndexPageSizeContent(pageIndex, pageSize, this.query)
        .subscribe((item) => {
          console.log(item);
          this.listUser = item;
        });
    } else {
      this.userService
        .getUserWithIndexPageAndPageSize(pageIndex, pageSize)
        .subscribe((item) => {
          console.log(item);
          this.listUser = item;
        });
    }
  }
  //==============END of Handle data and query stuff=========================
  //================HANDLE SHOW USER ID===============
  convertToPaddedString(number:any) {
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
  handleNextBefore(method: string) {
    if (method == '+' && this.listUser.length) {
      this.pageIndex++;
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
    if (method == '-' && this.pageIndex > 1) {
      this.pageIndex--;
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
  }

  ngOnInit(): void {
    this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    this.route.queryParams.subscribe((queryParams) => {
      this.query = queryParams['q'];

      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    });
  }
}
