import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { Country } from 'src/app/enums/country';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
 /**
  *
  */
 constructor(private formBuilder: FormBuilder, private userService:UserService, private toastrService:CustomToastrService, spinner: NgxSpinnerService) {
  super(spinner)
 }
  
  frm: FormGroup;
  countries: string[] = Object.values(Country);
 
  ngOnInit(): void {
   this.frm=this.formBuilder.group({
    username:["",[Validators.required, Validators.maxLength(25), Validators.minLength(5)]],
    email:["",[Validators.required, Validators.maxLength(150), Validators.minLength(5),Validators.email]],
    password:["",[Validators.required]],
    passwordAgain:["",[Validators.required]],
    country:["",[Validators.required]]
   })
  }

  get component() {
    return this.frm.controls;
  }
  submitted:boolean=false;
  async onSubmit(user:User){
    this.submitted=true;
    
    if (this.frm.invalid) {
      return;
    }
    
   const result: Create_User  = await this.userService.create(user);
   if (result.succeeded) 
    this.toastrService.message(result.message,"User registration successful",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopCenter
    })
    else
    this.toastrService.message(result.message, "The user could not be registered.", {
      messageType: ToastrMessageType.Error,
      position: ToastrPosition.TopCenter
    })
  }
}
 
 

