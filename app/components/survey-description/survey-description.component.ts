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
  surveyProgress: SurveyProgress;


  constructor(nav: NavController) {
    this.nav = nav;
  }

  ngAfterContentInit() {
    console.log("after content", this.survey);
  }

  viewSurvey(survey, surveyProgress) {
    this.nav.push(BeginSurveyPage, {
      survey,
      surveyProgress,
    });
  }

  ngOnChanges() {
    this.evaluateProgress(this.survey, this.surveysInProgress);
  }

  evaluateProgress(survey, surveysInProgress) {
    if (surveysInProgress) {
      let surveyProgressFound = false;
      surveysInProgress.forEach((sip) => {
        if (!surveyProgressFound) {
          if (survey.id === sip.surveyId) {
            this.inProgress = true;
            this.surveyProgress = {
              surveyId: sip.surveyId,
              lastQuestionId: sip.lastQuestionId,
            };
          }
        }
      });
    }
  }

}

