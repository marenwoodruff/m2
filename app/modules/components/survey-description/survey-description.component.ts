import {Component} from 'angular2/core';
import {Item, NavController} from 'ionic-angular';
import {Survey} from '../../survey/survey';
import {SurveyPage} from '../../../pages/survey/survey.page';

@Component({
  selector: 'survey-description',
  templateUrl: 'build/modules/components/survey-description/survey-description.component.html',
  directives: [Item],
  inputs:['survey']
})

export class SurveyDescriptionComponent {
  survey: Survey;
  nav: NavController;

  constructor(nav: NavController) {
    this.nav = nav;
  }

  viewSurvey(survey) {
    this.nav.push(SurveyPage, {
      question: survey
    });
  }

}
