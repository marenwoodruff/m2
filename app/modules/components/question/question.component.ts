import {Component} from 'angular2/core';
import {Page, NavParams} from 'ionic-angular';
import {Question} from '../../survey/question';
import {AnswerComponent} from '../answer/answer.component';

@Component({
  selector: 'question',
  templateUrl: 'build/modules/components/question/question.component.html',
  directives: [AnswerComponent],
  inputs: ['question']
})


export class QuestionComponent { 
  question: Question;
}
  



