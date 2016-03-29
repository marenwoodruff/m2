import {Component, OnInit} from 'angular2/core';
import {Item, NavController} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {SurveyPage} from '../../pages/survey/survey.page';

@Component({
  selector: 'survey-intro',
  templateUrl: 'build/components/survey-intro/survey-intro.component.html',
  directives: [Item],
  inputs: ['survey']
})

export class SurveyDescriptionComponent implements OnInit{
  survey: Survey;
  nav: NavController;

  constructor(nav: NavController) {
    this.nav = nav;
  }

  ngOnInit() {
    console.log('hi');
  }

  viewSurvey(survey) {
    this.nav.push(SurveyPage, {
      question: survey
    });
  }

}
