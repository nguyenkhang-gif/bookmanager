import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
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
}
