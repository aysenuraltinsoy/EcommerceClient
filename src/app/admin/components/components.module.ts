import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { CategoryModule } from './category/category.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RoleModule } from './role/role.module';




@NgModule({
  declarations: [
   

  ],
  imports: [
    CommonModule,
    ProductsModule,
    CustomerModule,
    ShoppingCartModule,
    CategoryModule,
    DashboardModule,
    AuthorizeMenuModule,
    RoleModule
  ]
})
export class ComponentsModule { }
