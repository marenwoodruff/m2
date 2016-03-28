import {OnInit} from 'angular2/core';
import {Page} from 'ionic-angular';
import {NavController, NavParams, Button} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {SurveyPage} from '../survey/survey.page';

@Page({
  templateUrl: 'build/pages/begin-survey/begin-survey.page.html',
  directives: [Button]
})

export class BeginSurveyPage {
  nav: NavController
  params: NavParams;
  survey: Survey;
  surveyTime: String;

  constructor(nav: NavController, params: NavParams) {
    this.nav = nav;
    this.params = params;
    this.survey = this.params.get('survey');
  }

  ngOnInit() {
    let
      length = this.survey.questions.length,
      surveyMinTime = Math.floor(length * 0.75),
      surveyMaxTime = length * 1;

    this.surveyTime = (`${surveyMinTime} - ${surveyMaxTime} mins`);
    console.log(this.surveyTime);
  }

  viewSurvey(survey) {
    this.nav.push(SurveyPage, {
      survey: survey
    });
  }

}
