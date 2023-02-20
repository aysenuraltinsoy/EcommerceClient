import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  
  
  /**
   *
   */
  constructor(private userAuthService:UserAuthService,spinner:NgxSpinnerService, private authService: AuthService, private activatedRoute:ActivatedRoute, private router:Router) {
    super(spinner)
  }
  
  ngOnInit(): void {  }


  login(usernameOrEmail:string ,password:string ){
    this.showSpinner(SpinnerType.SquareJellyBox);
    this.userAuthService.login(usernameOrEmail,password,()=>{
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params =>{
        const returnUrl:string=params["returnUrl"];
        if(returnUrl)
         this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.SquareJellyBox)
    });
  }
}
