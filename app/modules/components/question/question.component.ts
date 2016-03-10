import {Component} from 'angular2/core';
import {Question} from '../../survey/question';
import {AnswerComponent} from '../answer/answer.component';

@Component({
  selector: 'question',
  templateUrl: 'build/modules/components/question/question.component.html',
  directives: [AnswerComponent]
})

export class QuestionComponent { 
  question: Question;
}
  



