import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'admin_login', component: AdminLoginComponent },
  { path: 'dashboard' , component : AdminDashboardComponent , canActivate : [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
