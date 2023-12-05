import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { TitleService } from 'src/app/services/title.service';
import { UserService } from 'src/app/services/user.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommentService } from 'src/app/services/comment.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FollowService } from 'src/app/services/follow.service';
import { CheckoutService } from 'src/app/services/checkout.service';

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
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class AlluserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private bookService: BookServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private commentService: CommentService,
    private snackbarService: SnackbarService,
    private followService: FollowService,
    private checkoutService: CheckoutService
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
    console.log(this.query);

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

  // ================handle delete
  isConfirmWindowOpen = false;
  loading = false;
  deleteDone = false;
  userToDelete: any;
  handleCloseAll() {
    if (!this.loading) {
      this.isConfirmWindowOpen = false;
      this.userToDelete = null;
    }
  }
  startDelete(item: any) {
    this.isConfirmWindowOpen = true;
    this.userToDelete = item;
    console.log(item);
  }
  spinDisk = false;
  handleDelete() {
    this.loading = true;
    this.spinDisk = true;
    console.log(this.userToDelete.id);
    // delete comment?
    this.commentService.deleteWithUserId(this.userToDelete.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        if (e.status == 200) {
          console.log('delete success');
          this.snackbarService.showSuccess('xóa thành công comment');
          this.followService.deleteWithUserId(this.userToDelete.id).subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (e) => {
              console.log(e);
              if (e.status == 200) {
                console.log('xóa thành công');
                this.snackbarService.showSuccess('xóa thành công follow');
                this.checkoutService
                  .deleteWithUserId(this.userToDelete.id)
                  .subscribe({
                    next: (data) => {
                      console.log(data);
                    },
                    error: (e) => {
                      console.log(e);
                      if (e.status == 200) {
                        this.snackbarService.showSuccess(
                          'xóa thành công phiếu mượn'
                        );
                        this.loading = false;
                        this.deleteDone = true;
                      }
                    },
                  });
              }
            },
          });
        }
      },
    });
  }
  ngOnInit(): void {
    // this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    this.route.queryParams.subscribe((queryParams) => {
      this.query = queryParams['q'];
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    });
    this.titleService.setTitle('all user');
  }
}
