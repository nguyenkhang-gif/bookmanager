import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  constructor(private httpClient: HttpClient) {}

  insert(item: any) {
    return this.httpClient.post(
      `http://localhost:5280/NhaXuatBan/Insert`,
      item
    );
  }
  update(item: any) {
    return this.httpClient.post(
      `http://localhost:5280/NhaXuatBan/Update`,
      item
    );
  }
  delete(id: any) {
    return this.httpClient.delete(
      `http://localhost:5280/NhaXuatBan/Delete/${id}`
    );
  }
}
