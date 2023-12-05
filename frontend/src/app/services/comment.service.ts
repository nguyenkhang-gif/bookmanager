import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  getComments(
    pageIndex: any,
    pageSize: any,
    content?: any,
    bookid?: any,
    userid?: any,
    rating?: any,
    lowToHighSort?: any
  ) {
    let querys = new HttpParams();
    if (content) querys = querys.set('content', content);
    if (bookid) querys = querys.set('bookid', bookid);
    if (userid) querys = querys.set('userid', userid);
    if (rating) querys = querys.set('rating', rating);
    querys = querys.set('lowToHighSort', lowToHighSort);
    // console.log(lowToHighSort==true?"true":"false");

    console.log(querys);

    return this.httpClient.get<any[]>(
      `http://localhost:5280/NhanXet/getWithPageIndexAndPageItem/${pageIndex}/${pageSize}`,
      { params: querys }
    );
  }

  edit(item: any) {
    return this.httpClient.post(`http://localhost:5280/NhanXet/Update`, item);
  }

  delete(id: any) {
    return this.httpClient.delete(`http://localhost:5280/NhanXet/Delete/${id}`);
  }

  deleteWithBookId(bookid: any) {
    return this.httpClient.delete(
      `http://localhost:5280/NhanXet/DeleteWithBookId/${bookid}`
    );
  }

  deleteWithUserId(userId: any) {
    return this.httpClient.delete(
      `http://localhost:5280/NhanXet/DeleteWithUserId/${userId}`
    );
  }
}
