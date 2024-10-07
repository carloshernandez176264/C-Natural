import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { DetailProductComponent } from './components/cart/detail-product/detail-product.component';
import { SumaryOrderComponent } from './components/orders/sumary-order/sumary-order.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';


const routes: Routes = [
  {
    path: '', component:HomeComponent
  },
  {
    path: 'admin/products', component: ProductListComponent
  },
  {
    path: 'admin/products/add', component: ProductAddComponent
  },
  {
    path: 'admin/products/edit/:id', component: ProductAddComponent
  },
  {
    path: 'admin/category', component: CategoryListComponent
  },
  {
    path: 'admin/category/add', component: CategoryAddComponent
  },
  {
    path: 'admin/category/edit/:id', component: CategoryAddComponent
  },
  {
    path: 'cart/detailproduct/:id', component: DetailProductComponent
  },
  {
    path:'cart/sumary', component:SumaryOrderComponent
  },
  {
    path : 'user/register', component:RegistrationComponent
  },
  {
    path: "user/login",  component:LoginComponent
  },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
