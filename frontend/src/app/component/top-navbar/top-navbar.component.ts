import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  value = '';
  submit(){
    console.log("sumib!!!!!!!!!!!")
  }
}
