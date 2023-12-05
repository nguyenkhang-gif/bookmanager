import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CommentService } from 'src/app/services/comment.service';
import { BookServiceService } from 'src/app/services/book-service.service';
import { forkJoin } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class ProfileComponent implements OnInit {
  userInfo?: User;
  userForm: FormGroup;
  isChangePassword = false;
  selectedFile: File | null = null;
  imageData: string | null = null;
  allComment: any[] = [];
  isAllDataDone = false;
  constructor(
    private snackBarService: SnackbarService,
    private bookService: BookServiceService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private imageService: ImageService,
    private commentSerivce: CommentService // private sanitizer: DomSanitizer,
  ) {
    this.userForm = this.formBuilder.group({
      id: [null], // You can set initial values or use null
      username: ['', Validators.required], // Add any necessary validators
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      PasswordHash: [null], // You can set initial values or use null
      PasswordSalt: [null], // You can set initial values or use null
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
      // address: [''],
    });
  }

  // =============HANDLE IMAGE=======================
  getSafeImageUrl(base64: any) {
    return this.imageService.getSafeImageUrl(base64);
  }
  // =============END OF HANDLE IMAGE=====================

  //===========================handle upload==================================
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      this.imageService.convertToBase64(this.selectedFile, (base64String) => {
        console.log(base64String);
        if (this.userInfo && this.userInfo.imageData) {
          this.userInfo.imageData = base64String;
          console.log(this.userInfo.imageData);
        }
        // Ở đây, bạn có thể thực hiện các hành động khác với base64String
      });
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      this.snackBarService.showSuccess('chưa chọn file');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Gọi API để lưu ảnh
    this.userService.getMe().subscribe((item) => {
      this.http
        .post(`http://localhost:5280/TaiKhoan/UploadFile/${item}`, formData)
        .subscribe({
          next: (response) => {
            console.log('Upload successful', response);
            this.getUserInfo();
          },
          error: (error) => {
            console.error('Error uploading file', error);
          },
        });
    });
  }

  handleClosePasswordChange() {
    this.isChangePassword = false;

    const oldPasswordControl = this.userForm.get('oldPassword');
    const newPasswordControl = this.userForm.get('newPassword');
    const confirmPasswordControl = this.userForm.get('confirmPassword');

    oldPasswordControl!.reset();
    newPasswordControl!.reset();
    confirmPasswordControl!.reset();
  }
  handleOpenPasswordChange() {
    this.isChangePassword = true;
  }

  handleSaveChange() {
    if (this.userInfo != null) {
      this.userInfo.id = this.userForm.value.id;
      this.userInfo.username = this.userForm.value.username;
      this.userInfo.email = this.userForm.value.email;
      this.userInfo.firstName = this.userForm.value.FirstName;
      this.userInfo.lastName = this.userForm.value.LastName;
      this.userInfo.phone_number = this.userForm.value.phone_number;
      let checkpas =
        this.userForm.get('oldPassword')?.value != null &&
        this.userForm.get('newPassword')?.value != null &&
        this.userForm.get('confirmPassword')?.value != null;
      if (checkpas) {
        this.userService
          .editInfo(
            this.userInfo,
            this.userForm.get('oldPassword')?.value,
            this.userForm.get('newPassword')?.value
          )
          .subscribe({
            next: (item) => {
              //return token

              console.log(item);
              if (
                item != 'edit thành công không thay đổi pass' &&
                item != 'error'
              )
                localStorage.setItem('authToken', item);
            },
            error: (e) => {
              console.log('error: ', e);
            },
          });
      } else {
        this.userService.editInfo(this.userInfo).subscribe({
          next: (item) => {
            console.log(item);
          },
          error: (e) => {
            console.log('error: ', e);
          },
        });
      }
    }
  }

  Logout() {
    this.userService.Logout();
  }

  // =====HANDLE COMMENT STUFF========
  loadComment() {
    this.commentSerivce
      .getComments(
        this.pageIndex,
        4,
        null,
        null,
        this.userInfo?.id,
        this.rating,
        false
      )
      .subscribe({
        next: (data) => {
          this.allComment = data;
          console.log(this.allComment);

          const observables = this.allComment.map((book) =>
            this.bookService.getBookWithId(book.sachid)
          );

          forkJoin(observables).subscribe({
            next: (dataArray) => {
              dataArray.forEach((data, index) => {
                this.allComment[index].sach = data;
              });
              this.isAllDataDone = true;
            },
            error: (e) => {
              console.log(e);
            },
          });
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
  // =====END OF HANDLE COMMENT STUFF

  getUser(userId: any) {
    console.log('loading?');

    this.userService.getUser(userId).subscribe((item) => {
      console.log(item);

      this.userInfo = item;
      console.log(this.userInfo);
      this.loadComment();
      //handle loading screen
      this.userForm.patchValue({
        id: item.id,
        username: item.username,
        email: item.email,
        FirstName: item.firstName,
        LastName: item.lastName,
        phone_number: item.phone_number,
        // Set values for other fields as needed
      });
      // console.log(item);
    });
  }
  //lấy user
  getUserInfo() {
    this.userService.getMe().subscribe({
      next: (item) => {
        console.log(item);
        this.getUser(item);
        // this.getImage(item);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  //================handle loading stuff==============

  // ==================HANDLE PAGENITED=============
  itemsToRepeat = new Array(5);
  pageIndex = 1;
  handleNextBefore(method: string) {
    this.editComment = this.allComment[0];
    console.log(this.editComment.ngaydang);

    if (method == '+' && this.allComment.length) {
      this.pageIndex++;
      this.loadComment();
    }
    if (method == '-' && this.pageIndex > 1) {
      this.pageIndex--;
      this.loadComment();
    }
  }

  // ==================END OF HANDLE PAGENITED===========

  // ========================HANDLE EDIT COMMENT=================
  editComment: any;
  isHandleEditCommentOpen = false;
  openFullscreen = false;
  value = '';

  handleCloseAll() {
    this.isHandleEditCommentOpen = false;
    this.openFullscreen = false;
  }

  handleUdateRating(Newrate: number) {
    this.editComment.rating = Newrate + 1;
  }

  startEditComment(comment: any) {
    console.log(comment);
    this.editComment = comment;
    this.isHandleEditCommentOpen = true;
    this.openFullscreen = true;
  }

  HandleEditComment() {
    this.editComment.sach = null;
    const currentDate = new Date();
    console.log(this.imageService.convertDateString(currentDate));
    this.editComment.ngaydang =
      this.imageService.convertDateString(currentDate);
    this.commentSerivce.edit(this.editComment).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        this.snackBarService.showSuccess('edit thành công');
        this.loadComment();
      },
    });
  }

  // ========================END OF HANDLE EDIT COMMENT===========
  // ========================HANDLE DELLETE COMMENT==========

  deleteComment: any;
  openDeleteWindow = false;

  startDelete(item: any) {
    console.log(item);
    this.deleteComment = item;
    this.deleteComment.sach = null;
    this.openDeleteWindow = true;
  }
  handleDeleteComment() {
    console.log(this);

    this.commentSerivce.delete(this.deleteComment.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        this.openDeleteWindow = false;
        this.loadComment();
        this.snackBarService.showSuccess('xóa thành công');
      },
    });
  }
  closeDeleteWin() {
    this.openDeleteWindow = false;
  }

  // ========================END OF HANDLE DELLETE COMMENT==========
  // ==================HANDLE SEARCH COMMENT========
  rating = 5;
  handleUdateRatingWithSearch(index: any) {
    this.rating = index + 1;
    this.pageIndex = 1;
    this.loadComment();
  }

  // ==================END OF HANDLE SEARCH COMMENT========

  // =============POPUP WINDOWS=======
  popupWindowOpen = false;
  isLoading = true;
  receiveDataFromChild(data: string) {
    console.log('Dữ liệu nhận được từ component con:', data);
    this.popupWindowOpen = false;
  }
  // =============END OF POPUP WINDOWS=======
  //==============HANDLE SHOW ALL USER COMMENT==================

  //==============END OF HANDLE SHOW ALL USER COMMENT==================

  ngOnInit(): void {
    this.getUserInfo();
  }
}
