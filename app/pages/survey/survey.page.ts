import {Component} from 'angular2/core';
import {Page, NavParams} from 'ionic-angular';
import {Question} from '../../models/survey/question';
import {QuestionComponent} from '../../components/question/question.component';
import {Survey} from '../../models/survey/survey';

@Page({
  templateUrl: 'build/pages/survey/survey.page.html',
  directives: [QuestionComponent]
})


export class SurveyPage{
  params: NavParams;
  survey: Survey;

  constructor(params: NavParams) {
    this.params = params;
    this.survey = this.params.get('survey');
    console.log('survey:', this.survey);
  }
}
