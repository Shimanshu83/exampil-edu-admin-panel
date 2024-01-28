import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
     private authService: AuthService ,
     private router : Router, 
     private toastr: ToastrService, 
     private authSocialService: SocialAuthService
     ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.get(controlName).hasError(errorName) && this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  signInWithGoogle(): void {
    this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
      this.authService.googleLogin(user).subscribe(
        (response : any) => {

          if(response.status == true){

            this.toastr.success(response.message , "Success");
            // why is it not giving me the result.
            localStorage.setItem('token', JSON.stringify(response.values['jwt_token']));
            localStorage.setItem('role' ,JSON.stringify(response.values['user']['role']) ); 

            this.router.navigate(['user_page']); 
          }
          
          
        },
        (error) => {
          console.log(error)
          this.toastr.error(error.error.message , "Failed")
        }
      )
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value).subscribe(
        (response : any) => {

          if(response.status == true){

            this.toastr.success(response.message , "Success");
            // why is it not giving me the result.
            localStorage.setItem('token', JSON.stringify(response.values['jwt_token']));
            localStorage.setItem('role' ,JSON.stringify(response.values['user']['role']) ); 

            this.router.navigate(['user_page']); 
          }
          
          
        },
        (error) => {
          console.log(error)
          this.toastr.error(error.error.message , "Failed")
        }
      )
    }
  }

}
