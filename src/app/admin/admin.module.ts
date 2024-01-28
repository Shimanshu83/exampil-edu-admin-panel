// admin.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { AdminService } from './admin.service';


@NgModule({
  declarations: [AdminLoginComponent, AdminDashboardComponent],
  imports: [ 
        CommonModule, 
        FormsModule , 
        NgxEchartsModule , 
        ReactiveFormsModule, 
        AdminRoutingModule, 
        NgxEchartsModule.forRoot({ echarts }),
      
      ],
  providers : [ AdminService]
})
export class AdminModule {}
