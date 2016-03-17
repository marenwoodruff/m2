import {Page} from 'ionic-angular';
import {SurveysComponent} from '../../components/surveys/surveys.component';
import {OnInit, OnDestroy} from 'angular2/core';
import {SurveyService} from '../../service/survey.service';
import {Survey} from '../../models/survey/survey';

@Page({
  templateUrl: 'build/pages/surveys/surveys.page.html',
  directives: [SurveysComponent],
  providers: [SurveyService],
})

export class SurveysPage implements OnInit, OnDestroy{

    private _surveyApi: SurveyService;
    public surveys: Survey[];

    constructor(surveyService:SurveyService) {
      this._surveyApi = surveyService;
    }

    ngOnInit():any {
      this._surveyApi.surveys.subscribe(
        surveys => this.surveys = surveys,
        err => console.log('SurveysComponent subscribe error:', err),
        () =>  console.log('finished subscribing to surveys')
      );

      this._surveyApi.getSurveys();
    }

    ngOnDestroy() {
      this._surveyApi.surveys.unsubscribe();
    }
}
