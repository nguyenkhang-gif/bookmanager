import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  current: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }


  isSpecificUrl(url:string): boolean {
    // Check the current URL or parameters to determine if it matches a specific condition.
    const currentUrl = this.router.url;
    // You can also use ActivatedRoute to access route parameters.
    // const paramValue = this.route.snapshot.params['paramName'];
  
    // Example: Check if the URL contains '/specific-path'
    return currentUrl.includes(`/${url}`);
  }
  
  ngOnInit(): void {
    // this.current=this.route.url
  }
}
