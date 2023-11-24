import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
// import { User } from 'src/app/models/User';
// import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { User } from 'src/app/models/User';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: '#008000' },
    },
  ],
})
export class RegisterComponent implements OnInit {
  // constructor(private service : UserService){}
  constructor(
    private router: Router,
    private service: UserService,
    private snackbarService: SnackbarService
  ) {}
  tempUserRes?: User;

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  role: string = 'register';

  toLogin() {
    this.role = 'login';
  }
  toRegister() {
    this.role = 'register';
  }
  onSubmit() {
    if (
      this.registerForm.value.username != null &&
      this.registerForm.value.password != null &&
      this.role == 'login'
    ) {
      this.service
        .Login({
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
        })
        .subscribe({
          next: (item) => {
            console.log('login success', item);
            localStorage.setItem('authToken', item);
            this.router.navigate(['/']);
          },
        });
    }

    //==========================Register===============================

    if (
      this.registerForm.valid &&
      this.registerForm.value.username != null &&
      this.registerForm.value.password != null &&
      this.registerForm.value.confirmPassword ==
        this.registerForm.value.password &&
      this.role == 'register'
    ) {
      this.service
        .Register({
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
          email: this.registerForm.value.email,
        })
        .subscribe({
          next: (item) => {
            console.log('login success', item);

            this.router.navigate(['/']);
          },
          error: (e) => {
            console.log(e);
            this.snackbarService.showSuccess('đã có người dùng');
          },
        });
    } else {
      console.log(this.getFormValidationErrors());
      if (this.role != 'login')
        this.snackbarService.showSuccess('somthing go wrong');
    }
    //==========================Register END===============================
  }
  private getFormValidationErrors() {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            `Key control: ${key}, keyError: ${keyError}, err value: ${controlErrors[keyError]}`
          );
        });
      }
    });
  }
  onSubmit2() {
    if (this.registerForm.valid) {
      // Form is valid, proceed with your logic
      console.log('Form is valid. Submitting...');
    } else {
      // Form is not valid, log the validation errors
      console.log('Form is not valid. Validation errors:');
    }
  }

  ngOnInit(): void {
    // if()
    // this.router
    console.log(this.router.url);
  }
}
