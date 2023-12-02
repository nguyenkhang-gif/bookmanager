import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private httpClient: HttpClient) {}

  getAllCheckout() {
    return this.httpClient.get<any[]>(`http://localhost:5280/PhieuMuon/get`);
  }
  getSingleCheckout(checkout: any) {
    return this.httpClient.post<any>(
      `http://localhost:5280/PhieuMuon/getId`,
      checkout
    );
  }
  getWithCheckOutId(id: any) {
    return this.httpClient.get<any[]>(
      `http://localhost:5280/SachMuon/getWithCheckoutId/${id}`
    );
  }

  getwithBookId(bookid: any) {
    return this.httpClient.get<any[]>(
      `http://localhost:5280/SachMuon/getWithBookId/${bookid}`
    );
  }
  getWithId(id: any) {
    return this.httpClient.get(`http://localhost:5280/PhieuMuon/getById/${id}`);
  }
  insertSingleCheckout(checkout: any) {
    return this.httpClient.post<any>(
      `http://localhost:5280/PhieuMuon/insert`,
      checkout
    );
  }
  insertBookBorrow(list: any, checkoutid: any) {
    const url = `http://localhost:5280/SachMuon/InsertList/${checkoutid}?ids=${list.join(
      '&ids='
    )}`;
    return this.httpClient.get<any[]>(url);
  }

  getUserWithPageIndexPageSizeContent(
    pageIndex: number,
    pageSize: number,
    content?: any,
    startDate?: any,
    endDate?: any,
    isDone?: any
  ) {
    let url = `http://localhost:5280/PhieuMuon/GetAllWithSizeAndIndexAndContent`;
    let params = new HttpParams();
    console.log(startDate);
    console.log(endDate);
    
    if (content) params = params.set('content', content);
    if (startDate != '' && startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate != '' && endDate) {
      params = params.set('endDate', endDate);
    }
    console.log(isDone);

    if (isDone == 0 || isDone == 3 || isDone == 1 || isDone == 2)
      params = params.set('isDone', isDone);

    return this.httpClient.get<any[]>(url + `/${pageIndex}/${pageSize}`, {
      params,
    });
  }

  deleteRequestWithId(id: any) {
    return this.httpClient.delete(
      `http://localhost:5280/SachMuon/Delete/${id}`
    );
  }

  deleteRequest(checkoutid: any) {
    return this.httpClient.delete(
      `http://localhost:5280/SachMuon/DeleteIds?checkoutid=${checkoutid}`
    );
  }

  deleteCheckout(id: any) {
    return this.httpClient.delete(
      `http://localhost:5280/PhieuMuon/Delete/${id}`
    );
  }

  update(item: any) {
    return this.httpClient.post(`http://localhost:5280/PhieuMuon/Update`, item);
  }
}
