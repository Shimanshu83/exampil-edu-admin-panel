import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorMessageComponent } from '../libraries/validation-error-message/validation-error-message.component'; 

@NgModule({
    declarations : [
        ValidationErrorMessageComponent
    ], 
    imports :[
        CommonModule
    ],
    providers :[],
    exports :[
        ValidationErrorMessageComponent 
    ]
})
export class SharedModule {}