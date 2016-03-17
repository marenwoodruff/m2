import {Component} from 'angular2/core';
import {Page, NavParams} from 'ionic-angular';
import {Question} from '../../modules/survey/question';
import {Survey} from '../../modules/survey/survey';
import {QuestionComponent} from '../../modules/components/question/question.component';

@Page({
  templateUrl: 'build/pages/survey/survey.page.html',
  directives: [QuestionComponent]
})


export class SurveyPage{
  params: NavParams;
  survey: Survey;

  constructor(params: NavParams) {
    this.params = params;
    this.survey = this.params.get('question');
    console.log('survey:', this.survey);
  }
}