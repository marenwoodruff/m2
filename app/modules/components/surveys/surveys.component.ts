import {Component} from 'angular2/core';
import {SurveyComponent} from '../survey/survey.component';
import {SurveyService} from '../../../service/survey.service';

@Component({
  selector: 'surveys',
  templateUrl: 'build/modules/components/surveys/surveys.component.html',
  directives: [SurveyComponent],
  providers: [SurveyService]
})

export class SurveysComponent { 

  private _surveyApi: SurveyService;

  constructor(surveyService:SurveyService) {
    this._surveyApi = surveyService;
  }

}