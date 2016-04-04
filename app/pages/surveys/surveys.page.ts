import {Page} from 'ionic-angular';
import {EventEmitter} from 'angular2/core';
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
    public surveyIds = [];
    private surveySubscription: EventEmitter<Survey[]>;
    private storageSubscription: EventEmitter<Survey[]>;

    constructor(private _surveyApi: SurveyService, private _storageApi:StorageService) {
    }

    ngOnInit():any {
      this.surveySubscription = this._surveyApi.surveys.subscribe(
        surveys => this.surveys = surveys,
        err => console.log('SurveysComponent surveyservice subscribe error:', err),
        () =>  console.log('finished subscribing to surveys')
      );

      this.storageSubscription = this._storageApi.surveyProgress.subscribe(
        surveys => this.surveyProgress = surveys,
        err => console.log('SurveysComponent storageservice subscribe error:', err),
        () =>  console.log('finished subscribing to storage surveys')
      );
      
      this._surveyApi.getSurveys();
      // actually run this for each survey id
      this._storageApi.getSurveyProgress(287182928);
    }

    ngOnDestroy() {
      this.surveySubscription.unsubscribe();
      this.storageSubscription.unsubscribe();
    }

}
