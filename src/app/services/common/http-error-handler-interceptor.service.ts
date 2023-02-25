import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of } from 'rxjs';
import { SpinnerType } from '../../base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {


  //req gelen requesti temsil ediyor, next ise requestin devamını req parametresi aracılığıyla yapılan istekler manipüle ediliyor. Next ise sonraki
  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService, private router: Router, private spinner: NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     //requesti handle ederek devamını getir bundan sonrada pipe ile catcherror fonksiyonu devreye girsin, bir hata meydana gelirse yakalanması için
    //catch error hatayı observable olarak bize sunuyor
    return next.handle(req).pipe(catchError(error => {
      switch(error.status){
        case HttpStatusCode.Unauthorized :

          

         
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state) {
              const url=  this.router.url;
              if (url=="/products") 
                this.toastrService.message("You must be logged in to add products to the cart.","Please Login",{
                  messageType:ToastrMessageType.Warning,
                  position:ToastrPosition.TopFullWidth
                });
              
              else
                this.toastrService.message("You are not authorized to perform this action.","Unauthorized request!",{
                  messageType:ToastrMessageType.Warning,
                  position:ToastrPosition.TopFullWidth
                });
            }
          }).then(data=>{
            
          });
          break;
        case HttpStatusCode.InternalServerError :
          this.toastrService.message("The server is unreachable.","Internal Server Error!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopFullWidth
          });
          break;
        case HttpStatusCode.BadRequest :
          this.toastrService.message("Invalid request.","Bad Request!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopFullWidth
          });
          break;
        case HttpStatusCode.NotFound :
          this.toastrService.message("Page Not Found.","Not Found!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopFullWidth
          });
          break;
        default:
          this.toastrService.message("An unexpected error has occurred.","Unexpected Error!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopFullWidth
          });
          break;
      }
      this.spinner.hide(SpinnerType.SquareJellyBox);
      return of(error);
    }));    
  }
}
