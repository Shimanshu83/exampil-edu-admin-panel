import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;

  coursesDropdown = [
    { id : 1 , itemName : 'JEE' , value : 'JEE'},
    { id : 1 , itemName : 'NEET' , value : 'NEET'},
  ]

  constructor(private fb: FormBuilder ,
     private authService : AuthService ,
     private toastr: ToastrService, 
     private router : Router) {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]],
      age: ['', [Validators.required, Validators.min(7), Validators.max(99)]],
      courses: ['', [Validators.required, Validators.pattern(/^(NEET|JEE)$/)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  
  hasError(controlName: string, errorName: string) {
    return this.signupForm.get(controlName).hasError(errorName) && this.signupForm.get(controlName).invalid && this.signupForm.get(controlName).touched;
  }

  
  onSubmit() {
    if (this.signupForm.valid) {
      let value = this.signupForm.value ; 
      let formBody = {
        "name": value['name'],
        "contact_number": value['contactNumber'],
        "email": value['email'],
        "password": value['password'],
        "age": value['age'],
        "courses": value['courses'],
      }

      this.authService.signup(formBody).subscribe(
        (response) => {

          if(response.status == true){

            this.toastr.success(response.message , "Success");
            // why is it not giving me the result.
            localStorage.setItem('token', JSON.stringify(response.values['jwt_token']));
            localStorage.setItem('role' ,JSON.stringify(response.values['user']['role']) ); 

            this.router.navigate(['user_page']); 
          }
          
          
        },
        (error) => {
          this.toastr.error(error.error.message , "Failed")
        }
      );

    } else {      
      
      this.signupForm.markAllAsTouched();
    }
  }

}
