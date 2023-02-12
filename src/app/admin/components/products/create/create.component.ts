import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component,OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  
  constructor(spinner: NgxSpinnerService,private productService: ProductService, private alertify: AlertifyService) {
   super(spinner)
  }

  ngOnInit(): void {
    
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  create(name:HTMLInputElement,description:HTMLInputElement,price:HTMLInputElement,stock:HTMLInputElement){
      this.showSpinner(SpinnerType.BallScaleMultiple);
      const create_product: Create_Product=new Create_Product();
      create_product.name=name.value;
      create_product.description=description.value;
      create_product.price=parseInt(price.value);
      create_product.stock=parseFloat(stock.value);

      

      this.productService.create(create_product, () => {
        this.hideSpinner(SpinnerType.BallScaleMultiple);
        this.alertify.message("Product successfully added.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.createdProduct.emit(create_product);
      },  errorMessage => {
        this.alertify.message(errorMessage,
          {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
      });
    }
  }
   
  

