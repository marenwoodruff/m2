import {Component} from 'angular2/core';
import {Page, NavParams} from 'ionic-angular';
import {Question} from '../../models/survey/question';
import {AnswerComponent} from '../answer/answer.component';

@Component({
  selector: 'question',
  templateUrl: 'build/omponents/question/question.component.html',
  directives: [AnswerComponent],
  inputs: ['question']
})


export class QuestionComponent {
  question: Question;
}
