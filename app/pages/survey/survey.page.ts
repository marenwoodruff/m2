import {Page} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {SurveysComponent} from '../../modules/components/surveys/surveys.component';

@Page({
  templateUrl: 'build/pages/survey/survey.page.html',
  directives: [SurveysComponent]
})

export class SurveyPage { }
