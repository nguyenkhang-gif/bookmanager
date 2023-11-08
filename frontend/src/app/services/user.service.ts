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
  public Logout() {
    localStorage.removeItem('auth');
  }

  public Login(user: any): Observable<string> {
    return this.httpClient.post('http://localhost:5280/TaiKhoan/Login', user, {
      responseType: 'text',
    });
  }

  public editInfo(user: any): Observable<string> {
    return this.httpClient.post<string>(
      `http://localhost:5280/TaiKhoan/Update`,
      user,
    );
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
