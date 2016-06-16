import {Component, Host} from '@angular/core';
import {NgFormModel, ControlGroup} from '@angular/common';
import {ValidationService} from '../../service/validation.service';

@Component({
    selector: 'control-message',
    inputs: ['controlName: control', 'controlGroup', 'name: displayName'],
    template: `<div *ngIf="errorMessage !== null" style="color:red;">{{errorMessage}}</div>`,
    providers: [NgFormModel]
})
export class ControlMessageComponent {
    controlName: string;
    name: string;
    controlGroup: ControlGroup;
    constructor() { }

    get errorMessage() {
        let c = this.controlGroup.find(this.controlName);

        for (let propertyName in c.errors) {
            if (c.errors.hasOwnProperty(propertyName) && c.touched) {
                if (propertyName === 'required') {
                  return `${this.name} is required`;
                } else {
                  return ValidationService.getValidatorErrorMessage(propertyName);
                }
            }
        }

        return null;
    }
}