import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[dimensionValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: DimensionValidator,
        multi: true
    }]
})
export class DimensionValidator implements Validator {

    validate(control: AbstractControl): { [key: string]: any } | null {

        let controls = control.parent;
        if((controls.get('length')?.value || controls.get('height')?.value || controls.get('width')?.value) && !control.value){
            return { 'dimension': true }
        }
        return null;
    }
}