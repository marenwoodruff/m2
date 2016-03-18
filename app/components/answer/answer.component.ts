import {Component} from 'angular2/core';
import {Item, Label, RadioGroup, RadioButton} from 'ionic-angular';
import {RadioButtonComponent} from '../radio-button/radio-button.component';
import {TextboxComponent} from '../textbox/textbox.component';
import {CheckboxComponent} from '../checkbox/checkbox.component';
import {Answer} from '../../models/survey/answer';

@Component({
  selector: 'answer',
  templateUrl: 'build/components/answer/answer.component.html',
  directives: [Item, Label, RadioGroup, RadioButton, RadioButtonComponent, TextboxComponent, CheckboxComponent],
  inputs: ['answers']
})


export class AnswerComponent { 
  answers: Answer;
}
