import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private httpClient: HttpClient) {}

  getAllCheckout(){
    return this.httpClient.get<any[]>(`http://localhost:5280/PhieuMuon/get`)
  }
  getSingleCheckout(checkout:any){
    return this.httpClient.post<any>(`http://localhost:5280/PhieuMuon/getId`,checkout)
  }
  insertSingleCheckout(checkout:any){
    return this.httpClient.post<any>(`http://localhost:5280/PhieuMuon/insert`,checkout)
  }
  insertBookBorrow(list:any,checkoutid:any){
    const url = `http://localhost:5280/SachMuon/InsertList/${checkoutid}?ids=${list.join(
      '&ids='
    )}`;
    return this.httpClient.get<any[]>(url);
  }
}
