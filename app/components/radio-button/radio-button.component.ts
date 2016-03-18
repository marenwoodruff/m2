import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {Item, Label, RadioButton} from 'ionic-angular';
import {Question} from '../../models/survey/question';

@Component({
  selector: 'radio-button',
  templateUrl: 'build/components/radio-button/radio-button.component.html',
  directives: [FORM_DIRECTIVES, Item, Label, RadioButton],
  inputs: ['question'],
})

export class RadioButtonComponent {
  question: Question;

  getValue(id: number, res: any) {

    let choices = this.question.answer.options;

    choices.forEach(function(choice) {
      if (choice.value === res.value) {
        choice.selected = true;
      } else {
        choice.selected = false;
      }

      return choice;
    });
  }
}
