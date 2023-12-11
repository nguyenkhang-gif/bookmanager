import { Component, SimpleChanges } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone:true,
  // imports: [MatBadgeModule, MatButtonModule, MatIconModule],
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
