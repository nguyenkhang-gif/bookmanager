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
import { AlluserComponent } from './pages/alluser/alluser.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfileAdminComponent } from './pages/profile-admin/profile-admin.component';
import { AllrequestComponent } from './pages/allrequest/allrequest.component';
import { RequestdetailComponent } from './pages/requestdetail/requestdetail.component';
import { AddProductComponent } from './pages/add-product/add-product.component';

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
        component:AllproductsComponent,
        pathMatch:"full",
        // title:"Home"
      },
      {
        path:"allproduct",
        component:AllproductsComponent
      },
      {
        path:"alluser",
        component:AlluserComponent
      },
      {
        path:"card",
        component:AdminCardComponent
      },
      {
        path:"checkout",
        component:CheckoutComponent
      },
              
      {
        path:"search",
        component:AllproductsComponent
      },
      
      {
        path:"searchuser",
        component:AlluserComponent
      },
      
      {
        path:"profile/:id",
        component:ProfileAdminComponent
      },
      {
        path:'allrequest',
        component:AllrequestComponent
      },
      {
        path:"detail/:id",
        component:AdminProductDetailsComponent
      },
      {
        path:"addproduct",
        component:AddProductComponent
      },
      {
        path:"requestdetail/:id",
        component:RequestdetailComponent
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
