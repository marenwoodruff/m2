import {Component, OnInit, OnDestroy} from 'angular2/core';
import {SurveyComponent} from '../survey/survey.component';
import {SurveyService} from '../../../service/survey.service';
import {Survey} from '../../survey/survey';

@Component({
  selector: 'surveys',
  templateUrl: 'build/modules/components/surveys/surveys.component.html',
  directives: [SurveyComponent],
  providers: [SurveyService]
})

export class SurveysComponent implements OnInit, OnDestroy { 

  private _surveyApi: SurveyService;
  public surveys: Survey[];

  constructor(surveyService:SurveyService) {
    this._surveyApi = surveyService;
  }

  ngOnInit():any {
    this._surveyApi.surveys.subscribe(
      surveys => this.surveys = surveys,
      err => console.log('EventsComponent events subscribe error:', err),
      () => console.log('finished subscribing to events')
    );

    this._surveyApi.getSurveys();
  }

  ngOnDestroy() {

  }

}