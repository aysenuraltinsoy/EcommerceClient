import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{
  /**
   *
   */
  constructor(private productService:ProductService, private activatedRoute: ActivatedRoute, private basketService:BasketService,spinner: NgxSpinnerService,private customToastrService:CustomToastrService) {
   
    super(spinner)
  }
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number=12;
  pageList: number[]=[];

  products:List_Product[];

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo=parseInt(params["pageNo"] ?? 1); 
      const data:{totalPageCount:number, products: List_Product[]}= await this.productService.read(this.currentPageNo-1,this.pageSize,()=>{

      }, 
      errorMessage=>{

      });
     this.products=data.products;
     this.totalProductCount=data.totalPageCount;
     this.totalPageCount=Math.ceil((this.totalProductCount/this.pageSize));

     this.pageList=[];
     if (this.currentPageNo-3<=0) 
        for (let index = 1; index < 7; index++) {
          this.pageList.push(index);
          
        }

      else if (this.currentPageNo+3>=this.totalPageCount)
          for (let index = this.totalPageCount-6; index < this.totalPageCount; index++)
            this.pageList.push(index);

      else
            for (let index = this.currentPageNo-3; index <= this.currentPageNo+3; index++)
          this.pageList.push(index);
     
    });
  }


  async  addToBasket(product:List_Product){
    this.showSpinner(SpinnerType.BallCircus);
    let _basketItem: Create_Basket_Item=new Create_Basket_Item();
    _basketItem.productId=product.id;
    _basketItem.quantity=1;
      await this.basketService.add(_basketItem);
      this.hideSpinner(SpinnerType.BallCircus);
      this.customToastrService.message("The product has been added to the cart.","Added to Cart",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.BottomLeft
      });
  }

}
