import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { NgFor, NgIf } from '@angular/common';
import { Book } from 'src/app/models/Book';
import { Review } from 'src/app/models/Review';
import { Category } from 'src/app/models/Category';
import { Publisher } from 'src/app/models/Publisher';
import { format } from 'date-fns';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(private route: Router, private service: BookServiceService) {}
  imgurl: string = '../../../assets/biasach.png';
  imguserurl: string = '../../../assets/149071.png';

  rating: number = 1;
  RoundFunc(item: number) {
    return Math.ceil(item); //Returns 5(item)
  }
  itemsToRepeat = new Array(5);

  handleUdateRating(Newrate: number) {
    this.rating = Newrate + 1;
  }

  bookInfo?:Book
  comment:Review[]=[]
  category?:Category
  producerInfo?:Publisher
  averateRate:number=0
  commentText: string = '';
  currentDate = new Date();
  formattedDate = format(this.currentDate, "yyyy-MM-dd'T'HH:mm:ss");

  
  loaddata(url:any){
    this.service.getBookWithId(url).subscribe({
      next: (book) => {
        this.bookInfo=book
        console.log('book:', book);

        // console.log('bookid:', book.id);

        this.service.getComment(book.id).subscribe({
          next: (comments) => {
            console.log('commentS:', comments);
            // console.log('commentS lnegh:', comments.length);
            comments.forEach(item=>{
              this.averateRate += item.rating
              
            })
            this.averateRate /= comments.length
            // console.log("averateRate:",this.averateRate)
            this.comment=comments
          },
        })
        this.service.getCatgory(book.chudeid).subscribe({
          next: (cat) => {
            // console.log('chude:', cat);
            this.category=cat
          },
          error:(e)=>{
            console.log(e)
          }
        })
        this.service.getProducer(book.nhaxuatbanid).subscribe({
          next:(producer)=>{
            console.log("producer:",producer)
            this.producerInfo=producer
          }
        })


      },
    });
  }

  //handle add comment
  handleAddComment(){
    console.log("handle add comment",this.commentText);
    this.service.addReview(
      {
        sachid: parseInt(this.route.url.split('/')[2], 10),
        tieude: this.commentText,
        userid: '2',  // Đặt email, phone_number và address theo nhu cầu
        rating: this.rating,
        ngaydang: this.formattedDate, // Đặt ngày dự định theo nhu cầu
        // sachid: 101,
        // tieude: "Nhận xét sách 1",
        // userid: "1",
        // rating: 5,
        // ngaydang: "2023-10-15T08:30:00",
      }
    ).subscribe({
      next:(item)=>{
        console.log('add thành công',item);
        // lấy lại comment
        if(this.bookInfo)
        console.log("comments needs tobe add")
        // this.service.getComment(this.bookInfo.id).subscribe({
        //   next: (comments) => {
        //     console.log('commentS:', comments);
        //     // console.log('commentS lnegh:', comments.length);
        //     comments.forEach(item=>{
        //       this.averateRate += item.rating
              
        //     })
        //     this.averateRate /= comments.length
        //     // console.log("averateRate:",this.averateRate)
        //     this.comment=comments
        //   },
        // })
      },
      error:(e)=>{
        console.log("these and error",e.status)
        if(e.status&&this.bookInfo)
        this.service.getComment(this.bookInfo.id).subscribe({
            next: (comments) => {
              console.log('commentS:', comments);
              // console.log('commentS lnegh:', comments.length);
              comments.forEach(item=>{
                this.averateRate += item.rating
                
              })
              this.averateRate /= comments.length
              // console.log("averateRate:",this.averateRate)
              this.comment=comments
            },
          })
      }
    })
    // console.log({
    //   // sachid: parseInt(this.route.url.split('/')[2], 10),
    //   // tieude: this.commentText,
    //   // userid: '2',  // Đặt email, phone_number và address theo nhu cầu
    //   // rating: this.rating,
    //   // ngaydang: this.formattedDate, // Đặt ngày dự định theo nhu cầu
    //   sachid: 101,
    //   tieude: "Nhận xét sách 1",
    //   userid: "1",
    //   rating: 5,
    //   ngaydang: "2023-10-15T08:30:00",
    // });
    
    // console.log({
    //   sachid: parseInt(this.route.url.split('/')[2], 10),
    //   tieude: this.commentText,
    //   userid: '2',  // Đặt email, phone_number và address theo nhu cầu
    //   rating: this.rating,
    //   ngaydang: this.formattedDate, // Đặt ngày dự định theo nhu cầu
     
    // })
  }


  ngOnInit(): void {
    console.log("on route",this.route.url.split('/')[2])
    this.loaddata(this.route.url.split('/')[2])
    
  }


}
