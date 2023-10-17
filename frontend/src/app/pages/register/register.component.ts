import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  role:string="register"
  constructor(private router: Router) {}
  toLogin(){
    this.role = 'login'
  }
  toRegister(){
    this.role="register"
  }
  ngOnInit(): void {
    // this.router.
    
    console.log(this.router.url)
  }
}
