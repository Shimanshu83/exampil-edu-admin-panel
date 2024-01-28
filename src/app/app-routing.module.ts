import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path : 'login' , component : LoginComponent}, 
  { path : 'signup' , component : SignupComponent}, 
  { path : 'user_page' , component : UserPageComponent , canActivate : [AuthGuard]}, 
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
