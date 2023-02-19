import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   *
   */
  constructor(private jwtHelper: JwtHelperService,private router:Router, private toastrService:CustomToastrService) {
   

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      const token: string= localStorage.getItem("accessToken");

      //const decodeToken=this.jwtHelper.decodeToken(token);
      //const expirationDate: Date=this.jwtHelper.getTokenExpirationDate(token);
      let expired: boolean;
      try {
        expired=this.jwtHelper.isTokenExpired(token);
      } catch (error) {
        expired=true;
      }

         // state.url gitmek istenen url, route geldiğim url, login olduğunda otomatik state url e yönlendirilecek
      if (!token || expired) {
        this.router.navigate(["login"], {queryParams: {returnUrl:state.url}});
        this.toastrService.message("You must log in.","Unauthorized Access!",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.TopCenter
        })
      }
       
      

    return true;
  }
  
}
