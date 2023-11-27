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
    content?: string,
    startDate?: any,
    endDate?: any
  ) {
    let url = `http://localhost:5280/PhieuMuon/GetAllWithSizeAndIndexAndContent`;
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    console.log(params);
    
    // if (catid == 0)
    //   url = `http://localhost:5280/Dbosach/GetAllWithSizeAndIndexAndCateAndContent/${pageIndex}/${pageSize}?content=${content}`;
    // console.log(url);
    console.log(url);

    return this.httpClient.get<any[]>(url + '/1/4', { params });
  }
}
