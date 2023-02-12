import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:CategoryComponent}
    ])
  ]
})
export class CategoryModule { }
