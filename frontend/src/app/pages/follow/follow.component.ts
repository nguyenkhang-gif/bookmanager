import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
})
export class FollowComponent implements OnInit {
  constructor(
    private followService: FollowService,
    private userService: UserService
  ) {}
  followBookList: Book[] = [];

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.userService.getMe().subscribe({
      next: (item) => {
        console.log('userid:', item);
        this.followService.getAllfollowWithUserId(item).subscribe({
          next: (list) => {
            console.log('fromfollow: ', list);
            this.followBookList = list;
          },
        });
      },
      error: (e) => {
        console.log('error From follow:', e);
      },
    });
  }
  //handle mượn ngay
  handleBorrow() {
    console.log('borrow');
  }
  handleUnfollow(bookId: any) {
    console.log('unfollow', bookId);

    this.userService.getMe().subscribe((userid) => {
      this.followService.deleteWithUserIdAndBookId(userid, bookId).subscribe({
        // next: (item) => {
        //   console.log(item);

        // },
        error: (e) => {
          console.log('error delete: ', e);
          if (e.status == 200) {
            this.loadData()
          }
        },
      });
    });
  }
}
