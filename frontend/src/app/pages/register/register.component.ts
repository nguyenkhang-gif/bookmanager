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
    password: new FormControl(''),
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
    // console.log('this is in submit', this.service.getUser());
    if (
      this.registerForm.value.username != null &&
      this.registerForm.value.password != null
    ) {
  

      this.service
        .Login({
          // id: '', // You can set the id as needed
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
          // email: '', // Set the email, phone_number, address as needed
          // phone_number: '',
          // address: '',
        })
        .subscribe({
          next: (item) => {
            console.log('login success', item);
            localStorage.setItem('authToken', item);
            this.router.navigate(['/'])
            // console.log(item);
          },
        });
    }
  }
 

  ngOnInit(): void {
    // if()
    // this.router
    console.log(this.router.url);
  }
}
