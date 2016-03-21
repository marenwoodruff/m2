import {Component} from 'angular2/core';
import {Item, Label, RadioButton} from 'ionic-angular';
import {Question} from '../../models/survey/question';

@Component({
  selector: 'radio-button',
  templateUrl: 'build/components/radio-button/radio-button.component.html',
  directives: [Item, Label, RadioButton],
  inputs: ['question'],
})

export class RadioButtonComponent {
  question: Question;

  getValue(option: any) {

    let choices = this.question.answer.options;

    choices.forEach(function(choice) {
      if (choice.value === option.value) {
        choice.selected = true;
      } else {
        choice.selected = false;
      }
      return choice;
    });
  }
}
