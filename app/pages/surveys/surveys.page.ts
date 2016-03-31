import {Page} from 'ionic-angular';
import {SurveysComponent} from '../../components/surveys/surveys.component';
import {StorageService} from '../../service/storage.service';
import {SurveyService} from '../../service/survey.service';
import {OnInit, OnDestroy} from 'angular2/core';
import {Survey} from '../../models/survey/survey';

@Page({
  templateUrl: 'build/pages/surveys/surveys.page.html',
  directives: [SurveysComponent]
})

export class SurveysPage implements OnInit, OnDestroy{
    public surveyProgress: any;
    public surveys: Survey[];

    constructor(private _surveyApi: SurveyService, private _storageApi:StorageService) {

    }

    ngOnInit():any {
      this._surveyApi.surveys.subscribe(
        surveys => this.surveys = surveys,
        err => console.log('SurveysComponent subscribe error:', err),
        () =>  console.log('finished subscribing to surveys')
      );

      this._storageApi.surveyProgress.subscribe(
        survey => this.surveyProgress = survey,
        err => console.log('SurveysComponent subscribe error:', err),
        () =>  console.log('finished subscribing to surveys')
      );

      this._surveyApi.getSurveys();

    }

    ngOnDestroy() {
      this._surveyApi.surveys.unsubscribe();
      this._storageApi.surveyQuestions.unsubscribe();
    }
}
