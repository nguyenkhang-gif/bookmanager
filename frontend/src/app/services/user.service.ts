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

  public Login(user: any): Observable<string>  {
    return this.httpClient.post(
      'http://localhost:5280/TaiKhoan/Login',
      user,
      {
        responseType:'text'
      }
    );
  }
  public getMe(): Observable<string>  {
    return this.httpClient.get(
      'http://localhost:5280/TaiKhoan/Getme',
      {
        responseType:'text'
      }
    );
  }

  setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user))
  }

  getUser(){
    return localStorage.getItem("user")
  }
}
