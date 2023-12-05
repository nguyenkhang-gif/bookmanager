import { Component, OnInit } from '@angular/core';
// import { SafeUrl } from '@angular/platform-browser';
import { BookServiceService } from 'src/app/services/book-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Book } from 'src/app/models/Book';
import { Router } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss'],
})
export class AdminCardComponent implements OnInit {
  constructor(
    private bookService: BookServiceService,
    private sanitizer: DomSanitizer,
    private router: Router, // private localStorage: LocalStorageService
    private titleService:TitleService
  ) {}

  ///================Card handle====================
  cardList: any[] = [];
  listbook: Book[] = [];
  saveDataToLocalStorage(key: string, data: any): void {
    console.log(JSON.stringify(data));

    localStorage.setItem(key, JSON.stringify(data));
  }
  getData(key: any) {
    return JSON.parse(localStorage.getItem(key)!);
  }
  addToCard(item: any) {
    this.cardList.push(item);
    console.log(this.cardList);
    this.saveDataToLocalStorage('card', this.cardList);
  }
  clearCard() {
    localStorage.setItem('card', '[]');
    this.bookService.getBooksWithId(this.getData('card')).subscribe((list) => {
      console.log(list);
      this.listbook = list;
      this.cardList = this.getData('card');
    });
  }
  deleteCard(id: any) {
    let index = this.cardList.indexOf(id);
    console.log(index);

    this.cardList = this.cardList.filter((item) => item !== id);
    this.listbook = this.listbook.filter((item) => item.id !== id);
    console.log(this.listbook);
    this.saveDataToLocalStorage('card', this.cardList);
    console.log(this.cardList);
  }
  ///================Card handle====================
  //========================HANDLE IMAG STUFF=================================
  getSafeImageUrl(base64: any): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  //====================CHECK URL
  isSpecificUrl(url: string): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes(`/${url}`);
  }

  ngOnInit(): void {
    this.titleService.setTitle("card")
    this.bookService.getBooksWithId(this.getData('card')).subscribe((list) => {
      console.log(list);
      this.listbook = list;
      this.cardList = this.getData('card');
    });
    // this.saveDataToLocalStorage("card","[]")
    console.log(this.getData('card'));
  }
}
