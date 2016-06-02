import {Component, OnChanges} from '@angular/core';
import {Item, NavController, Icon, Button} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {BeginSurveyPage} from '../../pages/begin-survey/begin-survey.page';
import {SurveyProgress} from '../../models/survey/surveyProgress';
import {SurveyService} from '../../service/survey.service';

@Component({
  selector: 'survey-description',
  templateUrl: 'build/components/survey-description/survey-description.component.html',
  directives: [Item, Icon, Button],
  inputs:['survey', 'surveysInProgress', 'eventSurveys']
})

export class SurveyDescriptionComponent implements OnChanges {
  survey: Survey;
  surveysInProgress: SurveyProgress[];
  completed: boolean;
  inProgress: boolean;
  surveyProgress: SurveyProgress;
  eventSurveys: Array<any>;
  eventName: string;

  constructor(private _surveyApi: SurveyService, private nav: NavController) { }

  viewSurvey(survey, surveyProgress) {
    this.nav.push(BeginSurveyPage, {
      survey,
      surveyProgress: this.surveyProgress,
      inProgress: this.inProgress
    });
  }

  ngOnChanges() {
    this.getEventName();
    this.evaluateProgress(this.survey, this.surveysInProgress);
  }

  getEventName() {
    let eventSurvey = this.eventSurveys ? this.eventSurveys.filter(eventSurvey => eventSurvey.surveyId === this.survey.id) : null;
    
    this.eventName = eventSurvey[0].eventTitle + ' - ';
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

