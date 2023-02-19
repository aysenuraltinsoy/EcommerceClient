import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Country } from 'src/app/enums/country';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  implements OnInit {
 /**
  *
  */
 constructor(private formBuilder: FormBuilder) {}
  
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
  onSubmit(data:any){
    this.submitted=true;
    
    if (this.frm.invalid) {
      return;
    }
    
  }
 }
 

