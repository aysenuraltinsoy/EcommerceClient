import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {path:"admin",component:LayoutComponent, children:[
    {path:"",component:DashboardComponent},
    {path:"customers",loadChildren: ()=>import("./admin/components/customer/customer.module").then(module =>module.CustomerModule)},
    {path:"products",loadChildren: ()=>import("./admin/components/products/products.module").then(module =>module.ProductsModule)},
    {path:"categories",loadChildren: ()=>import("./admin/components/category/category.module").then(module =>module.CategoryModule)},
    {path:"shoppingcarts",loadChildren: ()=>import("./admin/components/shopping-cart/shopping-cart.module").then(module =>module.ShoppingCartModule)},
    {path:"dashboard",loadChildren: ()=>import("./admin/components/shopping-cart/shopping-cart.module").then(module =>module.ShoppingCartModule)},
    ]
  },
  {path:"",component:HomeComponent},
  {path:"basket", loadChildren: ()=>import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule)},
  {path:"products", loadChildren: ()=>import("./ui/components/products/products.module").then(module => module.ProductsModule)},
  {path:"register", loadChildren: ()=>import("./ui/components/register/register.module").then(module => module.RegisterModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
