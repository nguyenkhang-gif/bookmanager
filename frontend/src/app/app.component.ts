import { Component, SimpleChanges } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  current: string = '';
  cate: string = 'Initial Category';

  constructor(private router: Router, private route: ActivatedRoute) {}

  handleChildSearchchange() {
    console.log('cate in app com:', this.cate);
  }

  updateCategory(newCategory: string) {
    this.cate = newCategory;
    console.log('Category changed to:', this.cate);
  }

  

  isSpecificUrl(url: string): boolean {
    // Check the current URL or parameters to determine if it matches a specific condition.
    const currentUrl = this.router.url;
    
    // You can also use ActivatedRoute to access route parameters.
    // const paramValue = this.route.snapshot.params['paramName'];

    // Example: Check if the URL contains '/specific-path'
    return currentUrl.includes(`/${url}`);
  }

  ngOnInit(): void {
    console.log(this.cate);
    // this.current=this.route.url
  }
}
