import {Component} from 'angular2/core';
import {Question} from '../../survey/question';

@Component({
  selector: 'question',
  templateUrl: 'build/modules/components/question/question.component.html',
})

export class QuestionComponent { 
  question: Question;
}
  



