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

  constructor(nav: NavController, params: NavParams) {
    this.nav = nav;
    this.params = params;
    this.survey = this.params.get('survey');
  }

  viewSurvey(survey) {
    this.nav.push(SurveyPage, {
      survey: survey
    });
  }

}