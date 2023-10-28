import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  Login(user: User): Observable<any>  {
    return this.httpClient.post<User>(
      'http://localhost:5280/TaiKhoan/Login',
      user
    );
  }
}
