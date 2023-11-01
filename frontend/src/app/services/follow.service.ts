import { Injectable } from '@angular/core';
// import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../models/Favorite';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  constructor(private httpClient: HttpClient) {}

  getFollowWithUserAndBookId(userid: number, bookid: any) {
    return this.httpClient.get<Favorite>(
      `http://localhost:5280/Follow/getByUserId/${userid}/${bookid}`
    );
  }

  deleteWithId(id: number) {
    return this.httpClient.delete<Favorite>(
      `http://localhost:5280/Follow/Delete/${id}`,
      {}
    );
  }

  add(item: Favorite) {
    return this.httpClient.post<Favorite>(
      `http://localhost:5280/Follow/Insert`,
      item
    );
  }
}
