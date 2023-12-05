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

  getFollowWithUserAndBookId(userid: any, bookid: any) {
    return this.httpClient.get<Favorite>(
      `http://localhost:5280/Follow/getByUserId/${userid}/${bookid}`
    );
  }
  getAllfollowWithUserId(userid: any) {
    return this.httpClient.get<any>(
      `http://localhost:5280/Follow/getAllBookWithUserId/${userid}`
    );
  }

  deleteWithId(id: number) {
    return this.httpClient.delete<Favorite>(
      `http://localhost:5280/Follow/Delete/${id}`,
      {}
    );
  }

  deleteWithUserIdAndBookId(userid: any, bookId: any) {
    return this.httpClient.delete(
      `http://localhost:5280/Follow/DeleteWithUserIdAndBookId/${userid}/${bookId}`
    );
  }

  add(item: Favorite) {
    return this.httpClient.post<Favorite>(
      `http://localhost:5280/Follow/Insert`,
      item
    );
  }

  deleteWithUserId(userId: any) {
    return this.httpClient.delete(
      `http://localhost:5280/Follow/DeleteWithUserId/${userId}`
    );
  }
}
