import {Component, AfterContentInit, OnChanges} from 'angular2/core';
import {Item, NavController} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {BeginSurveyPage} from '../../pages/begin-survey/begin-survey.page';
import {SurveyProgress} from '../../models/survey/surveyProgress';

@Component({
  selector: 'survey-description',
  templateUrl: 'build/components/survey-description/survey-description.component.html',
  directives: [Item],
  inputs:['survey', 'surveysInProgress']
})

export class SurveyDescriptionComponent implements AfterContentInit, OnChanges {
  survey: Survey;
  surveysInProgress: SurveyProgress[];
  nav: NavController;
  completed: boolean;
  inProgress: boolean;

  constructor(nav: NavController) {
    this.nav = nav;
  }

  ngAfterContentInit() {
    console.log("after content", this.survey);
  }

  viewSurvey(survey) {
    this.nav.push(BeginSurveyPage, {
      survey: survey,
      inProgress: this.inProgress
    });
  }

  ngOnChanges() {
    this.evaluateProgress(this.survey, this.surveysInProgress);
  }

  evaluateProgress(survey, surveysInProgress) {
    if (surveysInProgress) {
      surveysInProgress.forEach((sip) => {
        if (survey.id === sip.surveyId) {
          this.inProgress = true;
        }
      });
    }
  }

}

