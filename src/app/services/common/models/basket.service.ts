import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) { }

  async get():Promise<List_Basket_Item[]>{
    const observable: Observable<List_Basket_Item[]>=this.httpClientService.get({
      controller:"shoppingcart",
    });

    return await firstValueFrom(observable);
  }


  async add(basketItem: Create_Basket_Item):Promise<void>{
    const observable: Observable<any>=  this.httpClientService.post({
      controller:"shoppingcart",
    },basketItem);

    return await firstValueFrom(observable);
  }

  async updateQuantity(basketItem:Update_Basket_Item):Promise<void> {
    const observable: Observable<any>=this.httpClientService.put({
      controller:"shoppingcart",
    },basketItem)
    return await firstValueFrom(observable);
  }

 async remove(shoppingCartItemId:string) {
  const observable: Observable<any>=this.httpClientService.delete({
    controller:"shoppingcart"
  },shoppingCartItemId);
 }  
}
