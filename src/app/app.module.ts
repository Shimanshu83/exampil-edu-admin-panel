import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './sharedModules/shared.module';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';

import { environment } from '../environment/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule, 
    NgxEchartsModule.forRoot({ echarts }),
    SocialLoginModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.access_token
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
