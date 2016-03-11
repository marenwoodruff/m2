import {Component} from 'angular2/core';
import {Answer} from '../../survey/answer';

@Component({
  selector: 'answer',
  templateUrl: 'build/modules/components/answer/answer.component.html',
})

export class AnswerComponent { 
  answer: Answer;
}

