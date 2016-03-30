import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {Item, Label, RadioButton} from 'ionic-angular';
import {Answer} from '../../models/survey/answer';

@Component({
  selector: 'radio-button',
  templateUrl: 'build/components/radio-button/radio-button.component.html',
  directives: [FORM_DIRECTIVES, Item, Label, RadioButton],
  inputs: ['answer'],
})

export class RadioButtonComponent {
  answer: any;
  
  getValue(id: number, res: any) {
    let choices = this.answer.answer.options;

    choices.forEach(function(c) {
      if (c.value === res.value) {
        c.selected = true;
      } else {
        c.selected = false;
      }

      return c;
    });
  }
}
