import {Component} from 'angular2/core';
import {Item, Label, RadioButton} from 'ionic-angular';
import {Answer} from '../../survey/answer';

@Component({
  selector: 'radio-button',
  templateUrl: 'build/modules/components/radio-button/radio-button.component.html',
  directives: [Item, Label, RadioButton],
  inputs: ['answer']
})

export class RadioButtonComponent {
  answer: Answer;

  getValue(val) {
    console.log(val);
  }
}

