import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  /**
   *
   */
  constructor(private productService:ProductService, private activatedRoute: ActivatedRoute) {
   

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

}
