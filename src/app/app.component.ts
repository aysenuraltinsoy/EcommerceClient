import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { AuthService } from './services/common/auth.service';
import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { HttpClientService } from './services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import {ComponentType} from '../app/services/common/dynamic-load-component.service'
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLoadComponentDirective
 
  constructor(private toastrService: CustomToastrService,public authService:AuthService, private router:Router,private httpClientService:HttpClientService, private dynamicLoadComponentService:DynamicLoadComponentService) {

    httpClientService.get({
      controller:"shoppingCart"
    }).subscribe(data=>{
    });
    toastrService.message('Welcome my Ecommerce Website, Ayşenur Altınsoy', 'Have fun!',
    {messageType: ToastrMessageType.Info,
      position: ToastrPosition.BottomCenter});
      authService.identityCheck();

  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Logout successful.","Signed out",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.TopCenter
    })
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent,
      this.dynamicLoadComponentDirective.viewContainerRef);
  }
}

