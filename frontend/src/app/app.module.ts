import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { TopNavbarComponent } from './component/top-navbar/top-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from './material/material.module';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './services/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './pages/profile/profile.component';
import { FollowComponent } from './pages/follow/follow.component';
import { BundleSectionComponent } from './components/bundle-section/bundle-section.component';
import { AllproductsComponent } from './pages/allproducts/allproducts.component';
import { AdminTopNavComponent } from './component/admin-top-nav/admin-top-nav.component';
import { HomeAdminComponentComponent } from './pages/home-admin-component/home-admin-component.component';
import { AdminProductDetailsComponent } from './pages/admin-product-details/admin-product-details.component';
import { AdminCardComponent } from './pages/admin-card/admin-card.component';
import { PopupWindowComponent } from './components/popup-window/popup-window.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AlluserComponent } from './pages/alluser/alluser.component';
import { ProfileAdminComponent } from './pages/profile-admin/profile-admin.component';
import { AllcheckoutComponent } from './pages/allcheckout/allcheckout.component';
import { AllrequestComponent } from './pages/allrequest/allrequest.component';
import { RequestdetailComponent } from './pages/requestdetail/requestdetail.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    NotfoundComponent,
    TopNavbarComponent,
    RegisterComponent,
    ProfileComponent,
    FollowComponent,
    BundleSectionComponent,
    AllproductsComponent,
    AdminTopNavComponent,
    HomeAdminComponentComponent,
    AdminProductDetailsComponent,
    AdminCardComponent,
    PopupWindowComponent,
    CheckoutComponent,
    AlluserComponent,
    ProfileAdminComponent,
    AllcheckoutComponent,
    AllrequestComponent,
    RequestdetailComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
