import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form,FormControl,FormGroup } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: '#008000' },
}]
})
export class RegisterComponent implements OnInit {

  // constructor(private service : UserService){}

  tempUserRes?:User
  
  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  role:string="register"
  constructor(private router: Router,
    private service : UserService
    ) {}
  toLogin(){
    this.role = 'login'
  }
  toRegister(){
    this.role="register"
  }
  onSubmit(){
    console.log("this is in submit")
    console.log(this.registerForm.value);
    // this.tempUserRes.username = this.registerForm.value.username
    if(this.registerForm.value.username!=null&&this.registerForm.value.password!=null){
   this.service.Login(
      {
        id: "", // You can set the id as needed
        username:  this.registerForm.value.username,
        password: this.registerForm.value.password,
        email: '',  // Set the email, phone_number, address as needed
        phone_number: '',
        address: ''
      }
    ).subscribe({
      next:(item)=>{
        console.log(item);
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }


  }

  ngOnInit(): void {
    // this.router
    console.log(this.router.url)
  }
}
