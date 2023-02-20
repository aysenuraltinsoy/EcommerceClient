import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
 
  constructor(private toastrService: CustomToastrService,public authService:AuthService) {
    toastrService.message('Welcome my Ecommerce Website, Ayşenur Altınsoy', 'Have fun!',
    {messageType: ToastrMessageType.Info,
      position: ToastrPosition.BottomCenter});
      authService.identityCheck();

  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.toastrService.message("Logout successful.","Signed out",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.TopCenter
    })
  }
}

