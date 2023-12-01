import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Book } from 'src/app/models/Book';
import { BookServiceService } from 'src/app/services/book-service.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-bundle-section',
  templateUrl: './bundle-section.component.html',
  styleUrls: ['./bundle-section.component.scss'],
})
export class BundleSectionComponent implements OnInit, OnDestroy {
  mostCommentRateView?: Book[] = [];
  mostCommentCount?: any;
  imgurl = `../../../assets/books/sach 1.jpg`;
  transtlate = -940;
  currentIndex = 2;
  averateRate = 0;
  constructor(
    private service: BookServiceService,
    private imageService: ImageService
  ) {}
  // private intervalSubscription: Subscription;

  getSafeImageUrl(data:any){
    return this.imageService.getSafeImageUrl(data)
  }

  clicktest() {
 
    console.log(this.mostCommentRateView);
  }
  nextSlide() {
    this.currentIndex =
      (this.currentIndex + 1) % this.mostCommentRateView!.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.mostCommentRateView!.length) %
      this.mostCommentRateView!.length;
  }

  ngOnInit(): void {
    // interval(2000).subscribe(() => {
    //   this.nextSlide()
    //   // Đây là nơi bạn đặt code cần thực thi mỗi giây
    // });
    this.service.getThreeStuff((templist: Book[], averateRate) => {
      templist.forEach((item) => {
        console.log(item);
        this.averateRate = averateRate;
        item.hinhanh = `../../../assets/books/${item.hinhanh}`;
      });
      // lo
      this.mostCommentRateView = templist;
      // Ở đây, bạn có thể thực hiện các thao tác khác với danh sách templist
    });
  }
  ngOnDestroy() {
    // Hủy đăng ký subscription để tránh rò rỉ bộ nhớ khi component bị hủy
    console.log('shit');
    // if (this.intervalSubscription) {
    //   this.intervalSubscription.unsubscribe();
    // }
  }
}
