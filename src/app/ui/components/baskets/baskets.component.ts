import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from "ngx-spinner";
import { BasketService } from 'src/app/services/common/models/basket.service';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { OrderService } from 'src/app/services/common/models/order.service';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $:any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit{

    
  constructor(spinner: NgxSpinnerService, private basketService:BasketService, private orderService:OrderService, private toastrService:CustomToastrService) {
    super(spinner);
   }


   basketItems:List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallCircus);
    this.basketItems=await this.basketService.get();
    this.hideSpinner(SpinnerType.BallCircus);
  }

  async changeQuantity(object:any) {
    this.showSpinner(SpinnerType.BallCircus);
    const basketItemId:string  =object.target.attibutes["id"].value;
    const quantity:number= object.target.value;
    const basketItem: Update_Basket_Item=new Update_Basket_Item();
    basketItem.shoppingCartItemId=basketItemId;
    basketItem.quantity=quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallCircus);
  }

  async removeBasketItem(shoppingCartItemId:string)
  {
    this.showSpinner(SpinnerType.BallCircus);
   
    await this.basketService.remove(shoppingCartItemId);
    $("."+shoppingCartItemId).fadeOut(500, ()=>this.hideSpinner(SpinnerType.BallCircus));
    
  }

  async shoppingComplete() {
    this.showSpinner(SpinnerType.BallCircus);
    const order:Create_Order=new Create_Order();
    order.address="İzmir";
    order.description="öyle ki böyleki"
    await  this.orderService.create(order)
    this.hideSpinner(SpinnerType.BallCircus);
    this.toastrService.message("The order has been created.","Order received",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.BottomLeft
    })
  }

}
