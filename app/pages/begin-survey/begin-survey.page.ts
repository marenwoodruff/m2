import {OnInit} from 'angular2/core';
import {Page} from 'ionic-angular';
import {NavController, NavParams, Button} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {SurveyPage} from '../survey/survey.page';
import {SurveyCompletedPage} from '../survey-completed/survey-completed.page';

@Page({
  templateUrl: 'build/pages/begin-survey/begin-survey.page.html',
  directives: [Button]
})

export class BeginSurveyPage {
  survey: Survey;
  surveyTime: String;

  constructor(private nav: NavController, private params: NavParams) {
    this.survey = this.params.get('survey');
  }

  private ngOnInit(): void {
    this.nav.push(SurveyCompletedPage, {
      survey: this.survey
    });
    let
      length = this.survey.questions.length,
      surveyMinTime = Math.floor(length * 0.30),
      surveyMaxTime = length * 0.50;

    this.surveyTime = (`${surveyMinTime} - ${surveyMaxTime} mins`);
    console.log(this.surveyTime);
  }

  private viewSurvey(survey): void {
    this.nav.push(SurveyPage, {
      survey: survey
    });
  }

}
