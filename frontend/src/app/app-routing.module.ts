import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { OrderPagesComponent } from './pages/order-pages/order-pages.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FollowComponent } from './pages/follow/follow.component';
import { authAdminGuard } from './guards/auth.guard';
import { AllproductsComponent } from './pages/allproducts/allproducts.component';
import { HomeAdminComponentComponent } from './pages/home-admin-component/home-admin-component.component';
import { AdminProductDetailsComponent } from './pages/admin-product-details/admin-product-details.component';
import { AdminCardComponent } from './pages/admin-card/admin-card.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full",
    // title:"Home"
  },
  {
    path:'search',
    component:HomeComponent,
    // canActivate:[authGuard]
  },
  {
    path:"detail/:id",
    component:DetailComponent,
    // canActivate:[authAdminGuard]
  },
  {
    path:"order",
    component:OrderPagesComponent
  },
  
  {
    path:"profile",
    component:ProfileComponent
  },

  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"admin",
    // component:AllproductsComponent,
    canActivate:[authAdminGuard],
    children:[
      {
        path:"",
        component:HomeAdminComponentComponent,
        pathMatch:"full",
        // title:"Home"
      },
      {
        path:"allproduct",
        component:AllproductsComponent
      },
      {
        path:"card",
        component:AdminCardComponent
      },
      {
        path:"search",
        component:AllproductsComponent
      },
      {
        path:"detail/:id",
        component:AdminProductDetailsComponent
      }
    ]
  },
  {
    path:"follow",
    component:FollowComponent
  },
  {
    path:"**",
    component:NotfoundComponent
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
