import {Component} from 'angular2/core';
import {Item, NavController} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {BeginSurveyPage} from '../../pages/begin-survey/begin-survey.page';

@Component({
  selector: 'survey-description',
  templateUrl: 'build/components/survey-description/survey-description.component.html',
  directives: [Item],
  inputs:['survey']
})

export class SurveyDescriptionComponent {
  survey: Survey;
  nav: NavController;
  savedSurvey: boolean;
  completedSurvey: boolean;


  constructor(nav: NavController) {
    this.nav = nav;
  }

  viewSurvey(survey) {
    this.nav.push(BeginSurveyPage, {
      survey: survey
    });
  }

}
