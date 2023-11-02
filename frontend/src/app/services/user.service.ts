import { Injectable } from '@angular/core';
// import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
// import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  Login(user: any): Observable<any>  {
    localStorage.setItem("user","this is an examplae")
    const temp:any = localStorage.getItem("random")
    // if(!temp){
      console.log("this  is temp: ", temp)
    // }
    return this.httpClient.post<any>(
      'http://localhost:5280/TaiKhoan/Login',
      user
    );
  }

  setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user))
  }

  getUser(){
    return localStorage.getItem("user")
  }
}
