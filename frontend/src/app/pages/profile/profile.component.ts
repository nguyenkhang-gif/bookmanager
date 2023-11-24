import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo?: User;
  userForm: FormGroup;
  isChangePassword = false;
  selectedFile: File | null = null;
  imageData: string | null = null;
  constructor(
    private snackBarService:SnackbarService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private imageService:ImageService
    // private sanitizer: DomSanitizer,

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

  getImage(userid: any): void {
    this.userService.getImage(userid).subscribe(
      (data: Blob) => {
        const blobArray: Blob[] = [data];
        console.log(blobArray);

        const reader = new FileReader();
        reader.onloadend = () => {
          // reader.result chứa dữ liệu ảnh dưới dạng base64
          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(data);
      },
      (error) => {
        console.error('Error getting image', error);
      }
    );
  }
  onSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      this.snackBarService.showSuccess("chưa chọn file")
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

  getUser(userId: any) {
    console.log('loading?');

    this.userService.getUser(userId).subscribe((item) => {
      console.log(item);

      this.userInfo = item;
      console.log('done?');

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
  popupWindowOpen = false;
  isLoading = true;
  receiveDataFromChild(data: string) {
    console.log('Dữ liệu nhận được từ component con:', data);
    this.popupWindowOpen = false;
  }

  ngOnInit(): void {
    this.getUserInfo();
  }
}
