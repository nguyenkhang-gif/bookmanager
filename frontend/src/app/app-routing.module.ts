import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { OrderPagesComponent } from './pages/order-pages/order-pages.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:"detail/:id",
    component:DetailComponent
  },
  {
    path:"**",
    component:NotfoundComponent
  },
  {
    path:"order",
    component:OrderPagesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
