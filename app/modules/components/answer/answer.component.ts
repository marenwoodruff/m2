import {Component} from 'angular2/core';
import {Answer} from '../../survey/answer';
import {Item, Label, Checkbox} from 'ionic-angular';

@Component({
  selector: 'answer',
  templateUrl: 'build/modules/components/answer/answer.component.html',
  directives: [Item, Label, Checkbox],
  inputs: ['answer']
})

export class AnswerComponent { 
  answer: Answer;
}

