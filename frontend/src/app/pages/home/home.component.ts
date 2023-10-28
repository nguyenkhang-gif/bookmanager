import { Component, OnInit } from '@angular/core';
import { BookCardService } from '../services/book-card.service';
import { bookCard } from 'src/app/models/bookCard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  constructor(
    private service:BookCardService
  ) {}

  bookCardList: bookCard[]=[]

  ngOnInit(): void {
    // console.log('oninit called');
    this.service.getBookCard().subscribe({
      next:(data)=>{
        this.bookCardList=data;
        console.log(data);
      },
      error:(e)=>{
        console.log(e)
      }
    });
    
  }
}
