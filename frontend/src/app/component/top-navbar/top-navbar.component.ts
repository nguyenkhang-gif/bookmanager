import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import {NgIf} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { Category } from 'src/app/models/Category';


@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  @Input() category?: string;
  @Output() categoryChange = new EventEmitter<string>();

  constructor(
    private service:BookServiceService,
    
  ){}
  value = '';
  changeCategory() {
    this.category = 'New Category'; // Đây là giá trị bạn muốn thay đổi
    this.categoryChange.emit(this.category);
  }

  submit(){
    console.log("sumib!!!!!!!!!!!",this.category)
    this.changeCategory()
    // this.catChange.emit("khang")
  }

  CategoryList:Category[]=[]

  
  

  ngOnInit(): void {
  
     
    this.service.getAllCatgory().subscribe({
      next:(list)=>{
        console.log("all catergory list",list)
        this.CategoryList=list
      }
    })
  }
}
