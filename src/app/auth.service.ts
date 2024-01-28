// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';  

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private apiUrl = environment.apiUrl ; 

  constructor(private http: HttpClient) {}
  

  login(data : any ): Observable<boolean> {

    return this.http.post<any>(`${this.apiUrl}/api/user/login`, data);
    
  }

  signup(data : any ) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/user/signup`, data);
  }

  adminLogin(data : any ): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/api/admin/login`, data);
  }

  googleLogin(user : any) {
    return this.http.post<any>(`${this.apiUrl}/api/user/google_login`, user);

  }



  logout(): void {
    this.isLoggedIn = false;
  }

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    console.log(token , userRole )
    return !!token && userRole  == '"user"' ; 
  }

  isAdminAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    return !!token && userRole  == '"admin"' ; 
  }


}
