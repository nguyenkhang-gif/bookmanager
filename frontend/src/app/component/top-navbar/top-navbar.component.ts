import { Component, Output } from '@angular/core';
import {NgIf} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';


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
