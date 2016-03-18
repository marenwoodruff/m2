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
  answer: Answer;

  getValue(id: number, res: any) {
    if (res.selected) {
      res.selected = false
    } else {
      res.selected = true;
    }
  }
}
