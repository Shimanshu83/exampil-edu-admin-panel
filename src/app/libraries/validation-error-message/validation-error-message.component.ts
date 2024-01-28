import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-error-message',
  templateUrl: './validation-error-message.component.html',
  styleUrls: ['./validation-error-message.component.scss']
})
export class ValidationErrorMessageComponent {
  
  error : any ; 
  errorMsg : any ; 
  controll : AbstractControl ; 

  @Input() 
  set control(ctrl : AbstractControl){
    this.controll = ctrl ; 

    // give error message from this side 
    this.errorMsg = this.controll.errors ; 
    if(this.errorMsg){

      let keys = Object.keys(this.errorMsg) ; 

      if(keys.length > 0){

        switch (keys[0]) {
          case "required":
            this.error = "This field is required.";
            break;
        case "minlength":
            this.error = "Minimum " + this.errorMsg['minlength']['requiredLength'] + " length required.";
            break;
        case "maxlength":
            this.error = "Maximum " + this.errorMsg['maxlength']['requiredLength'] + " length required.";
            break;
        case "email":
            this.error = "Please enter a valid email address";
            break;
        default:
            this.error = keys[0]  ; 
            break;
        }
      }
    }
  }
  
  
}
