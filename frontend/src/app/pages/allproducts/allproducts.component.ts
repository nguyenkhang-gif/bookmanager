import { Component } from '@angular/core';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  // standalone: true,
  styleUrls: ['./allproducts.component.scss'],
})
export class AllproductsComponent {
  value = 'Clear me';
  onSubmit(){
    console.log(this.value);
    
  }
}
