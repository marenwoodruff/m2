import {Component, OnInit, OnChanges} from 'angular2/core';
import {Item, NavController, Icon, Button} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {BeginSurveyPage} from '../../pages/begin-survey/begin-survey.page';
import {SurveyProgress} from '../../models/survey/surveyProgress';
import {SurveyService} from '../../service/survey.service';

@Component({
  selector: 'survey-description',
  templateUrl: 'build/components/survey-description/survey-description.component.html',
  directives: [Item, Icon, Button],
  inputs:['survey', 'surveysInProgress']
})

export class SurveyDescriptionComponent implements OnInit, OnChanges {
  survey: Survey;
  surveysInProgress: SurveyProgress[];
  completed: boolean;
  inProgress: boolean;
  surveyProgress: SurveyProgress;


  constructor(private _surveyApi: SurveyService, private nav: NavController) { }

  ngOnInit() {
    this._surveyApi.surveyComplete.subscribe(
      (completed) => { this.completed = completed }
      );
  }

  viewSurvey(survey, surveyProgress) {
    this.nav.push(BeginSurveyPage, {
      survey,
      surveyProgress,
      inProgress: this.inProgress
    });
  }

  ngOnChanges() {
    this.evaluateProgress(this.survey, this.surveysInProgress)
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

