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

  insert(item: any) {
    return this.httpClient.post(`http://localhost:5280/tacGium/Insert`, item);
  }
  update(item: any) {
    return this.httpClient.post(`http://localhost:5280/tacGium/Update`, item);
  }
  delete(id: any) {
    return this.httpClient.delete(`http://localhost:5280/tacGium/Delete/${id}`);
  }
}
