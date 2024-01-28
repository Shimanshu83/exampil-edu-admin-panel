import { FormArray, FormGroup } from "@angular/forms";



export class CommonMethod{

    constructor(){}

    static isFormValid(formGroup : FormGroup){
        (Object as any).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control instanceof FormGroup || control instanceof FormArray) {
                this.isFormValid(control as any)
            }
            else control.markAsTouched({ onlySelf: true });
        });
        return formGroup.valid
    }

}