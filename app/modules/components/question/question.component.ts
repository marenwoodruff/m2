import {Component} from 'angular2/core';
import {Page, NavParams} from 'ionic-angular';
import {Question} from '../../survey/question';
import {AnswerComponent} from '../answer/answer.component';

// @Component({
//   selector: 'question',
//   templateUrl: 'build/modules/components/question/question.component.html',
//   directives: [AnswerComponent],
// })

@Page({
  templateUrl: 'build/modules/components/question/question.component.html',
  directives: [AnswerComponent]
})


export class QuestionComponent { 
  question: Question;
  params: NavParams;
  questions: Question;

  constructor(params: NavParams) {
    this.params = params;
    this.questions = this.params.get('question');
    console.log(this.questions);
  }
}
  



