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
    private surveySubscription: EventEmitter<Survey[]>;
    private storageSubscription: EventEmitter<Survey[]>;

    constructor(private _surveyApi: SurveyService, private _storageApi:StorageService) {
      this.surveySubscription = this._surveyApi.surveys.subscribe(
        surveys => this.surveys = surveys,
        err => console.log('SurveysComponent subscribe error:', err),
        () =>  console.log('finished subscribing to surveys')
      );

      this.storageSubscription = this._storageApi.surveyProgress.subscribe(
        survey => this.surveyProgress = survey,
        err => console.log('SurveysComponent subscribe error:', err),
        () =>  console.log('finished subscribing to surveys')
      );
    }

    ngOnInit():any {
      this._surveyApi.getSurveys();
    }

    ngOnDestroy() {
      this.surveySubscription.unsubscribe();
      this.storageSubscription.unsubscribe();
    }
}
