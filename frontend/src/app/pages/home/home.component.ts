import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  list: Book[] = [
    {
      id: 1,
      title:"book 1",
      author:"author 1",
      genre:"genre 1",
      publisher:"publisher",
      publishDate : new Date(),
      price:900
    },
    {
      id: 2,
      title:"book 2",
      author:"author 2",
      genre:"genre 2",
      publisher:"publisher 2",
      publishDate : new Date(),
      price:900
    },
    {
      id: 3,
      title:"book 3",
      author:"author 3",
      genre:"genre 3",
      publisher:"publisher",
      publishDate : new Date(),
      price:900
    },
   
  ];

  constructor(private service: BookServiceService) {}
  ngOnInit(): void {
    // this.service.getBooks().subscribe({
    //   next:(item)=>{
    //     this.list = item
    //   },
    //   error:(e)=>{
    //     console.log("error",e)
    //   }
    // })
    // console.log(this.list.length)
  }
}
