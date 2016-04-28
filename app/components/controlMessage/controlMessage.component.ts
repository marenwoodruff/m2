import {Component, Host} from 'angular2/core';
import {NgFormModel, ControlGroup} from 'angular2/common';
import {ValidationService} from '../../service/validation.service';

@Component({
    selector: 'control-message',
    inputs: ['controlName: control', 'controlGroup'],
    template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
    providers: [NgFormModel]
})
export class ControlMessageComponent {
    controlName: string;
    controlGroup: ControlGroup;
    constructor() { }

    get errorMessage() {
        let c = this.controlGroup.find(this.controlName);

        for (let propertyName in c.errors) {
            if (c.errors.hasOwnProperty(propertyName) && c.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName);
            }
        }

        return null;
    }
}
