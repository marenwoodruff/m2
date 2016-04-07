import {Component, OnInit, OnChanges} from 'angular2/core';
import {Item, NavController} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {BeginSurveyPage} from '../../pages/begin-survey/begin-survey.page';
import {SurveyProgress} from '../../models/survey/surveyProgress';
import {SurveyService} from '../../service/survey.service';

@Component({
  selector: 'survey-description',
  templateUrl: 'build/components/survey-description/survey-description.component.html',
  directives: [Item],
  inputs:['survey', 'surveysInProgress']
})

export class SurveyDescriptionComponent implements OnInit, OnChanges {
  survey: Survey;
  surveysInProgress: SurveyProgress[];
  completed: boolean;
  inProgress: boolean;

  constructor(private _surveyApi: SurveyService, private nav: NavController) { }

  ngOnInit() {
    this._surveyApi.surveyComplete.subscribe(
      (completed) => { this.completed = completed }
      );
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

