import {Component} from 'angular2/core';
import {Item, Label} from 'ionic-angular';
import {RadioButtonComponent} from '../radio-button/radio-button.component';
import {TextboxComponent} from '../textbox/textbox.component';
import {CheckboxComponent} from '../checkbox/checkbox.component';
import {Answer} from '../../models/survey/answer';

@Component({
  selector: 'answer',
  templateUrl: 'build/components/answer/answer.component.html',
  directives: [Item, Label, RadioButtonComponent, TextboxComponent, CheckboxComponent],
  inputs: ['answer']
})


export class AnswerComponent { 
  answer: Answer;
}
