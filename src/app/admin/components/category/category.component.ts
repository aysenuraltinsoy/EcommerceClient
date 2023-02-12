import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends BaseComponent implements OnInit{

    
    constructor(spinner: NgxSpinnerService) {
      super(spinner);
     }
    ngOnInit(): void {
      this.showSpinner(SpinnerType.BallScaleMultiple);
    }

}
