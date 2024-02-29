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
import { environment } from '../environment/environment';
import { AuthModule } from 'angular-auth-oidc-client';


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
    AuthModule.forRoot({
      config: {
        authority: 'https://accounts.google.com',
        redirectUrl: "http://localhost:3000/auth/google/callback",
        clientId: '284778176057-0bdfr6oj1k3su1qm6g7dn0v3dcrkhr88.apps.googleusercontent.com',
        responseType: 'code',
        scope: 'openid profile email',
        postLogoutRedirectUri: window.location.origin,
        startCheckSession: false,
        silentRenew: false,
        silentRenewUrl: window.location.origin + '/silent-renew.html',
      },
    }),

  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
