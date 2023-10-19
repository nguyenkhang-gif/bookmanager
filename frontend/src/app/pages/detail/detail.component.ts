import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { NgFor, NgIf } from '@angular/common';
import { Book } from 'src/app/models/Book';
import { Review } from 'src/app/models/Review';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(private route: Router, private service: BookServiceService) {}
  imgurl: string = '../../../assets/biasach.png';
  imguserurl: string = '../../../assets/149071.png';

  rating: number = 0.5;
  RoundFunc(item: number) {
    return Math.floor(item); //Returns 5(item)
  }
  itemsToRepeat = new Array(5);

  handleUdateRating(Newrate: number) {
    this.rating = Newrate + 1;
  }

  bookInfo?:Book
  comment:Review[]=[]
  category?:Category
  
  loaddata(url:any){
    this.service.getBookWithId(url).subscribe({
      next: (book) => {
        this.bookInfo=book
        // console.log('book:', book);
        // console.log('bookid:', book.id);

        this.service.getComment(book.id).subscribe({
          next: (comments) => {
            console.log('commentS:', comments);
            this.comment=comments
          },
        });
        this.service.getCatgory(book.chudeid).subscribe({
          next: (cat) => {
            // console.log('chude:', cat);
            this.category=cat
          },
        });
      },
    });
  }

  ngOnInit(): void {
    console.log(this.route.url.split('/')[2])
    this.loaddata(this.route.url.split('/')[2])
  }
}
