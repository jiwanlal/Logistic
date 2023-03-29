import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[listValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ListValidatorDirective,
        multi: true
    }]
})
export class ListValidatorDirective implements Validator {

    @Input() listValidator:any[];
    @Input() validatorKey:any;

    validate(control: AbstractControl): { [key: string]: any } | null {
       
        return this.listValidator?this.listValidator?.find(x=>x[this.validatorKey] === control.value)?null:{ 'invalid': true } :null
    }
}