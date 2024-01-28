// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const userRoute = ['user_page'];
    const adminRoute = ['dashboard'];
    const currentRoute = route.routeConfig ? route.routeConfig.path : '';
    
    console.log(currentRoute); 

    if (userRoute.includes(currentRoute) && this.authService.isUserAuthenticated()) {
      // User is authenticated and on a user route
      return true;
    } else if (adminRoute.includes(currentRoute) && this.authService.isAdminAuthenticated()) {
      // User is authenticated and on an admin route
      return true;
    } else {

      this.router.navigate(['/login']);
      return false;
    }
  }
}
