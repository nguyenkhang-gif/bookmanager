import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormControl, FormGroup } from '@angular/forms';
// import { User } from 'src/app/models/User';
// import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { User } from 'src/app/models/User';

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

  tempUserRes?: User;

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  role: string = 'register';
  constructor(private router: Router, private service: UserService) {}
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
            // console.log(item);
          },
        });
    }

    //==========================Register===============================
    
    if (
      (this.registerForm.value.username != null &&
        this.registerForm.value.password != null &&
        this.registerForm.value.confirmPassword ==
          this.registerForm.value.password,
      this.role == 'register')
    ) {
      console.log(this.registerForm.value.username);
      console.log(this.registerForm.value.email);

      console.log(this.registerForm.value.confirmPassword);
      console.log(this.registerForm.value.password);
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
          },
        });
    }
    //==========================Register END===============================
  }

  ngOnInit(): void {
    // if()
    // this.router
    console.log(this.router.url);
  }
}
