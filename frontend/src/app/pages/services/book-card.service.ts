import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { bookCard } from 'src/app/models/bookCard';
@Injectable({
  providedIn: 'root'
})
export class BookCardService {
  constructor(
    private httpclient:HttpClient
  ) { }
  getBookCard(){
    return this.httpclient.get<bookCard[]>("http://localhost:5280/BookCard/get")
  }
}
