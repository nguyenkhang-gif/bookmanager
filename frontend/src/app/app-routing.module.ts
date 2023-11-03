import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { OrderPagesComponent } from './pages/order-pages/order-pages.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full",
    // title:"Home"
  },
  {
    path:'search',
    component:HomeComponent
  },
  {
    path:"detail/:id",
    component:DetailComponent
  },
  {
    path:"order",
    component:OrderPagesComponent
  },
  {
    path:"register",
    component:RegisterComponent
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
