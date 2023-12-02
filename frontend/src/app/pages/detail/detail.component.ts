import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { NgFor, NgIf } from '@angular/common';
import { Book } from 'src/app/models/Book';
import { Review } from 'src/app/models/Review';
import { Category } from 'src/app/models/Category';
import { Publisher } from 'src/app/models/Publisher';
import { format } from 'date-fns';
import { FollowService } from 'src/app/services/follow.service';
import { Favorite } from 'src/app/models/Favorite';
import { TitleService } from 'src/app/services/title.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Observable, forkJoin } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { AuthorService } from 'src/app/services/author.service';
import * as THREE from 'three';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    // private THREE:THREE,
    private authorService: AuthorService,
    private serviceUser: UserService,
    private route: Router,
    private service: BookServiceService,
    private FollowSer: FollowService,
    private titleService: TitleService,
    private snackbarService: SnackbarService,
    private imageService: ImageService,
    private elementRef: ElementRef,
    private commentSerivce: CommentService
  ) {}
  // =========================HANDLE 3D STUFF==========

  // =========================END OF HANDLE 3D STUFF========

  imgurl: string = '';
  imguserurl: string = '../../../assets/149071.png';

  rating: number = 5;
  filterRating = 5;
  RoundFunc(item: number) {
    return Math.ceil(item); //Returns 5(item)
  }
  itemsToRepeat = new Array(5);

  handleUdateRating(Newrate: number) {
    this.rating = Newrate + 1;
  }

  bookInfo?: Book;
  author = '';
  comment: Review[] = [];
  category?: Category;
  producerInfo?: Publisher;
  averateRate: number = 0;
  commentText: string = '';
  currentDate = new Date();
  formattedDate = format(this.currentDate, "yyyy-MM-dd'T'HH:mm:ss");
  isFollow: boolean = false;
  thisFollow?: Favorite;

  FollowDbUpdate(userId: any) {
    if (this.isFollow) {
      this.snackbarService.showSuccess('đã bỏ theo dõi');
      // console.log('handle remove follow');
      if (this.thisFollow && this.thisFollow.id)
        this.FollowSer.deleteWithId(this.thisFollow.id).subscribe({
          next: (item) => {
            console.log('followUpdate:', item);

            this.handleFollow();
          },
          error: (e) => {
            this.handleFollow();
          },
        });
    } else {
      this.snackbarService.showSuccess('theo dõi thành công');
      this.FollowSer.add({
        Sachid: parseInt(this.route.url.split('/')[2]),
        taikhoanid: userId,
      }).subscribe({
        next: (item) => {
          this.handleFollow();
        },
        error: (e) => {
          this.handleFollow();
        },
      });

      // this.isFollow = true;
    }
  }

  handleFollowClick() {
    this.serviceUser.getMe().subscribe({
      next: (item) => {
        this.FollowDbUpdate(item);
      },
    });
  }

  //lấy follow như kiểu load data, có tính hợp update
  handleFollow() {
    this.serviceUser.getMe().subscribe({
      next: (item) => {
        //có user
        this.FollowSer.getFollowWithUserAndBookId(
          item,
          this.route.url.split('/')[2]
        ).subscribe({
          next: (item) => {
            if (item) {
              this.thisFollow = item;
              this.isFollow = true;
            } else {
              this.isFollow = false;
              this.thisFollow = item;
            }
          },
          error: (e) => {
            console.log(e);
          },
        });
      },
    });
  }
  getSafeImageUrl(base64: any) {
    return this.imageService.getSafeImageUrl(base64);
  }

  loaddata(url: any) {
    this.service.getBookWithId(url).subscribe({
      next: (book) => {
        this.titleService.setTitle(book.tensach);
        this.bookInfo = book;
        console.log('book:', book);
        // this.imgurl = `../../../assets/books/${book.hinhanh}`;
        this.fetchComments(book.id);
        this.loadComment();
        this.service.getCatgory(book.chudeid).subscribe({
          next: (cat) => {
            // lấy chủ đề
            this.category = cat;
          },
        });
        this.authorService
          .getAuthorWithBookId(book.tacgiaid)
          .subscribe((item_2) => {
            console.log(item_2);
            this.author = item_2.tentacgia;
          });

        this.service.getProducer(book.nhaxuatbanid).subscribe({
          next: (producer) => {
            this.producerInfo = producer;
          },
        });
      },
    });
  }

  // =================START of add coment func
  getName(id: any) {
    this.serviceUser.getNameWithId(id).subscribe((name) => {
      return name;
    });
  }
  private fetchComments(bookId: number) {
    this.service.getComment(bookId).subscribe({
      // lấy comments
      next: (comments) => {
        comments.forEach((item) => {
          this.averateRate += item.rating;
          // lấy tên
          this.serviceUser.getNameWithId(item.userid).subscribe((name) => {
            item.user = name;
          });
          this.serviceUser.getUser(item.userid).subscribe((item_2) => {
            console.log(item_2);
            item.image = item_2.imageData;
          });
        });
        this.averateRate /= comments.length;

        // this.comment = comments;
      },
    });
  }
  // =================START of add coment func

  //handle add comment
  handleAddComment() {
    this.serviceUser.getMe().subscribe({
      next: (item: string) => {
        // console.log(item);
        this.snackbarService.showSuccess('add thành công !!!');
        // ==============START OF ADD COMMENT===============
        this.service
          .addReview({
            sachid: parseInt(this.route.url.split('/')[2], 10),
            tieude: this.commentText,
            userid: item, // Đặt email, phone_number và address theo nhu cầu
            rating: this.rating,
            ngaydang: this.formattedDate, // Đặt ngày dự định theo nhu cầu
          })
          .subscribe({
            next: (item) => {
              console.log('add thành công', item);
              // lấy lại comment
              if (this.bookInfo) console.log('comments needs tobe add');
            },
            error: (e) => {
              console.log('these and error', e.status);
              if (e.status && this.bookInfo)
                this.fetchComments(this.bookInfo.id);
            },
          });

        // ==============END OF ADD COMMENT===============
      },
      error: (e) => {
        this.snackbarService.showSuccess('add không thành công !!!');
        console.log(e.status);
      },
    });
  }

  // =========================HANDLE PAGENITE

  pageIndex = 1;
  loadComment() {
    this.commentSerivce
      .getComments(
        this.pageIndex,
        8,
        null,
        this.route.url.split('/')[2],
        null,
        this.filterRating,
        false
      )
      .subscribe({
        next: (data) => {
          this.comment = data;
          console.log(this.comment);

          this.comment.forEach((s_comment) => {
            console.log(s_comment);
            this.serviceUser.getUser(s_comment.userid).subscribe({
              next: (data) => {
                console.log(data);
                s_comment.user = data;
              },
            });
          });
          // console.log(this.allComment);
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
  handleNextBefore(method: string) {
    // this.editComment = this.allComment[0];
    // console.log(this.editComment.ngaydang);

    if (method == '+' && this.comment.length) {
      this.pageIndex++;
      this.loadComment();
    }
    if (method == '-' && this.pageIndex > 1) {
      this.pageIndex--;
      this.loadComment();
    }
  }

  // =========================END OF HANDLE PAGENITE

  ngOnInit(): void {
    this.handleFollow();
    console.log('on route', this.route.url.split('/')[2]);
    this.loaddata(this.route.url.split('/')[2]);
  }
}
