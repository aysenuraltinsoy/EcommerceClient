import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';




@NgModule({
  declarations: [
    AppComponent,
    DynamicLoadComponentDirective,
    
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: ()=>localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7189"]
      }
    }),
  ],
  providers: [
    {provide:"baseUrl", useValue:"https://localhost:7189/api",multi:true},
    {provide:HTTP_INTERCEPTORS ,useClass: HttpErrorHandlerInterceptorService, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
