import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  adminLoginForm: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router : Router, 
    private toastr: ToastrService,
    ) {
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required ]],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.adminLoginForm.get(controlName).hasError(errorName)  && this.adminLoginForm.get(controlName).invalid && this.adminLoginForm.get(controlName).touched;
  }

  onSubmit() {
    if (this.adminLoginForm.valid) {

      this.authService.adminLogin(this.adminLoginForm.value).subscribe(
        (response : any) => {

          if(response.status == true){

            this.toastr.success(response.message , "Success");
            // why is it not giving me the result.
            localStorage.setItem('token', JSON.stringify(response.values['jwt_token']));
            localStorage.setItem('role' ,JSON.stringify(response.values['user']['role']) ); 

            this.router.navigate(['admin' , 'dashboard']); 
          }
          
          
        },
        (error) => {
          console.log(error)
          this.toastr.error(error.error.message , "Failed")
        }
      )
    }
    else{
      this.adminLoginForm.markAllAsTouched() ; 
    }
  }

}
