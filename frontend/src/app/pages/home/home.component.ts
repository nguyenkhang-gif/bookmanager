import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  list: Book[] =[];

  constructor(private service: BookServiceService) {}
  ngOnInit(): void {
    this.service.getBooks().subscribe({
      next:(item)=>{
        this.list = item
        console.log(this.list)
      },
      error:(e)=>{
        console.log("error",e)
      }
    })
    // console.log(this.list.length)
  }
}
