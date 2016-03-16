import {Component} from 'angular2/core';
import {Page, NavParams} from 'ionic-angular';
import {Question} from '../../modules/survey/question';
import {QuestionComponent} from '../../modules/components/question/question.component';

@Page({
  templateUrl: 'build/pages/survey/survey.page.html',
  directives: [QuestionComponent]
})


export class SurveyPage{
  question: Question;
  params: NavParams;
  questions: Question;

  constructor(params: NavParams) {
    this.params = params;
    this.questions = this.params.get('question');
    console.log(this.questions);
  }
}