// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authToken : string = localStorage.getItem('token'); 

    if(authToken){

      authToken = authToken.replace(/"/g, ''); 
      
    }
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next.handle(authReq);
  }
}
