import { Injectable } from '@angular/core';
// import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';
// import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  public Logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  public Login(user: any): Observable<string> {
    return this.httpClient.post('http://localhost:5280/TaiKhoan/Login', user, {
      responseType: 'text',
    });
  }

  public editInfo(
    user: any,
    oldPassword?: any,
    newPassword?: any
  ): Observable<any> {
    var urlString = `http://localhost:5280/TaiKhoan/Update`;
    if (oldPassword != null && newPassword != null) {
      console.log('have pass');

      urlString = `http://localhost:5280/TaiKhoan/Update?oldPassword=${oldPassword}&newPassword=${newPassword}`;
    }
    return this.httpClient.post(urlString, user, {
      responseType: 'text',
    });
  }

  public getMe(): Observable<string> {
    return this.httpClient.get('http://localhost:5280/TaiKhoan/Getme', {
      responseType: 'text',
    });
  }
  getNameWithId(id: any): Observable<string> {
    return this.httpClient.get(
      `http://localhost:5280/TaiKhoan/getNameById/${id}`,
      {
        responseType: 'text',
      }
    );
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(id: any): Observable<User> {
    return this.httpClient.get<any>(
      `http://localhost:5280/TaiKhoan/getById/${id}`
    );
  }
}
