import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { author } from '../models/authtor';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private httpClient: HttpClient) {}
  getAllAuthtor() {
    return this.httpClient.get<any[]>('http://localhost:5280/tacGium/get');
  }
  getAuthorWithBookId(id: any) {
    return this.httpClient.get<any>(
      `http://localhost:5280/tacGium/getById/${id}`
    );
  }

  
}
