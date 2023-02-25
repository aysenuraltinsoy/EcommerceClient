import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from "ngx-spinner";
import { BasketService } from 'src/app/services/common/models/basket.service';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';


@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit{

    
  constructor(spinner: NgxSpinnerService, private basketService:BasketService) {
    super(spinner);
   }


   basketItems:List_Basket_Item[];
  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallCircus);
    this.basketItems=await this.basketService.get();
    this.hideSpinner(SpinnerType.BallCircus);
  }

}
