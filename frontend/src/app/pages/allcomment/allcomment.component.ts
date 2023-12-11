import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { nextDay } from 'date-fns';
import { BookServiceService } from 'src/app/services/book-service.service';
import { CommentService } from 'src/app/services/comment.service';
import { ImageService } from 'src/app/services/image.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

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
  selector: 'app-allcomment',
  templateUrl: './allcomment.component.html',
  styleUrls: ['./allcomment.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class AllcommentComponent implements OnInit {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private bookService: BookServiceService,
    private imageService: ImageService,
    private snackbarService: SnackbarService
  ) {}
  isDataDoneLoading = false;
  mainList: any[] = [];
  pageIndex: any = 1;
  itemInPage: any = 8;
  content = null;
  bookid = null;
  userid = null;
  rating = 5;
  lowToHighSort = true;

  onSubmit() {
    this.loadData();
  }

  //
  getSafeImageUrl(data: any) {
    return this.imageService.getSafeImageUrl(data);
  }

  //=============================END OF BOOKID STUFF=========================
  handleNextBefore(method: string) {
    if (method == '+' && this.mainList.length) {
      this.pageIndex++;
      this.loadData();
      // this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
    if (method == '-' && this.pageIndex > 1) {
      this.pageIndex--;
      // this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
      this.loadData();
    }
  }

  // load All comment

  loadData() {
    console.log(this.content);

    this.isDataDoneLoading = false;
    this.commentService
      .getComments(
        this.pageIndex,
        this.itemInPage,
        this.content,
        null,
        null,
        this.rating,
        this.lowToHighSort
      )
      .subscribe((data) => {
        console.log(data);
        this.mainList = data;
        this.mainList.forEach((comment) => {
          console.log(comment);
          this.userService.getUser(comment.userid).subscribe((user) => {
            comment.user = user;
            this.isDataDoneLoading = true;
            console.log(user);
          });
          this.bookService.getBookWithId(comment.sachid).subscribe((book) => {
            console.log(book);
            comment.sach = book;
            this.isDataDoneLoading = true;
          });
        });
      });
  }
  //

  // handle delete
  removeElementFromArray(arr: number[], elementToRemove: any): any[] {
    return arr.filter((item) => item !== elementToRemove);
  }
  delete(item: any) {
    // console.log(id);
    this.commentService.delete(item.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        if (e.status == 200) {
          this.snackbarService.showSuccess('Xóa thành công');
          this.mainList = this.removeElementFromArray(this.mainList, item);
        }
      },
    });
  }

  ngOnInit(): void {
    this.loadData();
  }
}
