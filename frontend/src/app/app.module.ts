import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { TopNavbarComponent } from './component/top-navbar/top-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { OrderPagesComponent } from './pages/order-pages/order-pages.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    NotfoundComponent,
    TopNavbarComponent,
    OrderPagesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
