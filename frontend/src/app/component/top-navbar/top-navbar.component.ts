import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { Category } from 'src/app/models/Category';
import { query } from '@angular/animations';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit {
  category?: number;
  value = '';
  onSubmitString: string = '';
  CategoryList: Category[] = [];
  constructor(
    private service: BookServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  isSpecificUrl(url: string): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes(`/${url}`);
  }

  setCat(index: number) {
    this.category = index;

    this.router.navigate(['/search'], {
      queryParams: { q: this.value, cat: this.category },
    });
  }
  getListCat() {
    this.service.getAllCatgory().subscribe({
      next: (list) => {
        // console.log('all catergory list', list);
        this.CategoryList = list;
      },
    });
  }

  submit() {
    // console.log('sumib!!!!!!!!!!!');
    this.router.navigate(['/search'], {
      queryParams: { q: this.value, cat: this.category },
    });
    this.onSubmitString = this.value;
  }

  

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.value = queryParams['q'];
      this.category = queryParams['cat'];
      this.onSubmitString = queryParams['q'];
    });
    // this.onSubmitString=queryParams['q'];
    this.getListCat();
  }
}
