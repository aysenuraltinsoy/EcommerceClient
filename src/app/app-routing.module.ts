import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AuthGuard } from './guards/common/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {path:"admin",component:LayoutComponent, children:[
    {path:"",component:DashboardComponent},
    {path:"customers",loadChildren: ()=>import("./admin/components/customer/customer.module").then(module =>module.CustomerModule),canActivate:[AuthGuard]},
    {path:"products",loadChildren: ()=>import("./admin/components/products/products.module").then(module =>module.ProductsModule),canActivate:[AuthGuard]},
    {path:"categories",loadChildren: ()=>import("./admin/components/category/category.module").then(module =>module.CategoryModule),canActivate:[AuthGuard]},
    { path: "orders", loadChildren: () => import("./admin/components/order/order.module").then(module => module.OrderModule), canActivate: [AuthGuard] },
    {path:"shoppingcarts",loadChildren: ()=>import("./admin/components/shopping-cart/shopping-cart.module").then(module =>module.ShoppingCartModule),canActivate:[AuthGuard]},
    {path:"dashboard",loadChildren: ()=>import("./admin/components/shopping-cart/shopping-cart.module").then(module =>module.ShoppingCartModule),canActivate:[AuthGuard]},
    {path:"authorize-menu",loadChildren: ()=>import("./admin/components/authorize-menu/authorize-menu.module").then(module =>module.AuthorizeMenuModule),canActivate:[AuthGuard]},
    {path:"roles",loadChildren: ()=>import("./admin/components/role/role.module").then(module =>module.RoleModule),canActivate:[AuthGuard]},
    ],canActivate:[AuthGuard]
  },
  {path:"",component:HomeComponent},
  {path:"basket", loadChildren: ()=>import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule)},
  {path:"products", loadChildren: ()=>import("./ui/components/products/products.module").then(module => module.ProductsModule)},
  {path:"products/:pageNo", loadChildren: ()=>import("./ui/components/products/products.module").then(module => module.ProductsModule)},
  {path:"register", loadChildren: ()=>import("./ui/components/register/register.module").then(module => module.RegisterModule)},
  {path:"login", loadChildren: ()=>import("./ui/components/login/login.module").then(module => module.LoginModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
