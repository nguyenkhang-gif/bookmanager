import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { Review } from '../models/Review';
import { Category } from '../models/Category';
@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  constructor(private httpClient: HttpClient) {}
  getBooks(){
    return this.httpClient.get<Book[]>("http://localhost:5280/Dbosach/get");
  }
  getBookWithId(id:number){
    return this.httpClient.get<Book>("http://localhost:5280/Dbosach/getById/"+id);
  }
  getComment(bookId:number){
    return this.httpClient.get<Review[]>("http://localhost:5280/NhanXet/getAllwithId/"+bookId);
  }
  getCatgory(bookId:number){
    return this.httpClient.get<Category>("http://localhost:5280/ChuDe/getWithId/"+bookId);
  }

}
