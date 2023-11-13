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
    const currentUrl = this.router.url;
    return currentUrl.startsWith(`${url}`);
  }

  ngOnInit(): void {
    console.log(this.cate);
    // this.current=this.route.url
  }
}
