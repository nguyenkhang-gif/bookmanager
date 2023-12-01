import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { Review } from '../models/Review';
import { Category } from '../models/Category';
import { Publisher } from '../models/Publisher';
import { Observable, switchMap, forkJoin, tap, catchError } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) {}
  getBooks() {
    return this.httpClient.get<Book[]>('http://localhost:5280/Dbosach/get');
  }


  getHighestReview() {
    return this.httpClient.get<number>(
      'http://localhost:5280/Dbosach/GetHighestReview'
    );
  }
  getMostReview() {
    return this.httpClient.get<any>(
      'http://localhost:5280/Dbosach/GetMostReview'
    );
  }
  getMostBorrow() {
    return this.httpClient.get<any>(
      'http://localhost:5280/Dbosach/GetMostBorrowCount'
    );
  }

  getBookWithId(id: number) {
    return this.httpClient.get<Book>(
      'http://localhost:5280/Dbosach/getById/' + id
    );
  }
  getComment(bookId: number) {
    return this.httpClient.get<Review[]>(
      'http://localhost:5280/NhanXet/getAllwithId/' + bookId
    );
  }
  getCatgory(bookId: number) {
    return this.httpClient.get<Category>(
      'http://localhost:5280/ChuDe/getWithId/' + bookId
    );
  }
  getAllCatgory() {
    return this.httpClient.get<Category[]>('http://localhost:5280/ChuDe/get');
  }
  getProducer(bookId: number) {
    return this.httpClient.get<Publisher>(
      'http://localhost:5280/NhaXuatBan/getWithId/' + bookId
    );
  }
  getAllProducer() {
    return this.httpClient.get<Publisher[]>(
      `http://localhost:5280/NhaXuatBan/get`
    );
  }

  addReview(item: any) {
    return this.httpClient.post<any>(
      'http://localhost:5280/NhanXet/Insert',
      item
    );
  }
  getBooksWithId(list: any[]): Observable<any[]> {
    const url = `http://localhost:5280/Dbosach/GetByIds?ids=${list.join(
      '&ids='
    )}`;
    return this.httpClient.get<any[]>(url);
  }

  getBookWithCatId(id: number) {
    return this.httpClient.get<Book[]>(
      'http://localhost:5280/Dbosach/getByChuDeId/' + id
    );
  }
  getBookWithCatIdAndContent(id: number, searchcontent: string) {
    return this.httpClient.post<Book[]>(
      `http://localhost:5280/Dbosach/getByChuDeIdAndString/${id}/${searchcontent}`,
      {}
    );
  }
  getBookWithIndexPageAndPageSize(pageIndex: number, pageSize: number) {
    return this.httpClient.get<Book[]>(
      `http://localhost:5280/Dbosach/GetAllWithSizeAndIndex/${pageIndex}/${pageSize}`
    );
  }

  getBookWithPageIndexPageSizeCatIdContent(
    pageIndex: number,
    pageSize: number,
    catid?: number,
    content?: string
  ) {
    let url = `http://localhost:5280/Dbosach/GetAllWithSizeAndIndexAndCateAndContent/${pageIndex}/${pageSize}?catid=${catid}&content=${content}`;
    if (catid == 0)
      url = `http://localhost:5280/Dbosach/GetAllWithSizeAndIndexAndCateAndContent/${pageIndex}/${pageSize}?content=${content}`;
    console.log(url);
    return this.httpClient.get<Book[]>(url);
  }
  getBookWithPageIndexPageSizeCatId(
    pageIndex: number,
    pageSize: number,
    catid: number
  ) {
    const url = `http://localhost:5280/Dbosach/GetAllWithSizeAndIndexAndCateId/${pageIndex}/${pageSize}?catid=${catid}`;
    return this.httpClient.get<Book[]>(url);
  }

  //most comment highest rate and mot borrow count
  getThreeStuff(callback: (templist: Book[], averateRate: any) => void): any {
    let templist: Book[] = [];
    let averateRate = 0;

    this.getHighestReview().subscribe((bookid_1) => {
      // console.log(bookid_1);
      this.getBookWithId(bookid_1).subscribe((book_1) => {
        this.getComment(bookid_1).subscribe({
          // lấy comments
          next: (comments) => {
            comments.forEach((item) => {
              averateRate += item.rating;
              // lấy tên
            });
            averateRate /= comments.length;
          },
        });
        templist.push(book_1);
        // =================handle most review
        this.getMostReview().subscribe({
          error: (bookid_2) => {
            console.log(bookid_2.error.text.split(' '));
            this.getBookWithId(bookid_2.error.text.split(' ')[0]).subscribe(
              (book_2) => {
                console.log(book_2);
                templist.push(book_2);
                //======= Start OF GET MOST BORROW =======
                this.getMostBorrow().subscribe((book_3) => {
                  console.log(book_3);
                  templist.push(book_3);
                  console.log(averateRate);

                  // console.log('templist add',templist);

                  callback(templist, averateRate);
                });
                //======= END OF GET MOST BORROW =========
              }
            );
          },
        });
        // ===========end of most review
      });
    });
  }
  //  update book
  updateBook(book: any) {
    return this.httpClient.post(
      `http://localhost:5280/Dbosach/Update`,
      book
    );
  }
  getImage(userId: number): Observable<Blob> {
    const url = `http://localhost:5280/Dbosach/GetImage/${userId}`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }
  getImages(): Observable<any> {
    const url = 'http://localhost:5280/Dbosach/GetImages';
    return this.httpClient.get(url, { responseType: 'arraybuffer' });
  }
  getSafeImageUrl(base64: any): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  // getImages(): Observable<Blob[]> {
  //   const url = `http://localhost:5280/Dbosach/GetImages`;
  //   return this.httpClient.get<Blob[]>(url, { responseType: 'blob' as 'json' });
  // }


//  =============================INSERT BOOK==========
  insertBook(item:any){
    return this.httpClient.post(`http://localhost:5280/Dbosach/Insert`,item)
  }
//  =============================END OF INSERT BOOK==========
}
