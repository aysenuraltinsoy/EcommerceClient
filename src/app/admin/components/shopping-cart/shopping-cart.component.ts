import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends BaseComponent implements OnInit{

    
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
   }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple);
  }

}