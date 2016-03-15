import {Component} from 'angular2/core';
import {Answer} from '../../survey/answer';
import {Item, Label, RadioGroup} from 'ionic-angular';
import {RadioButtonComponent} from '../radio-button/radio-button.component';

@Component({
  selector: 'answer',
  templateUrl: 'build/modules/components/answer/answer.component.html',
  directives: [Item, Label, RadioGroup, RadioButtonComponent],
  inputs: ['answer']
})

export class AnswerComponent { 
  answer: Answer;

}

