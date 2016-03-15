import {Component} from 'angular2/core';
import {Item, NavController} from 'ionic-angular';
import {Survey} from '../../survey/survey';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'survey',
  templateUrl: 'build/modules/components/survey/survey.component.html',
  directives: [Item],
  inputs:['survey']
})

export class SurveyComponent {
  survey: Survey;
  nav: any;

  constructor(nav: NavController) {
    this.nav = nav;
  }

  viewSurvey(survey) {
    console.log(survey);
    this.nav.push(QuestionComponent, {
      question: survey
    });
  }

}
