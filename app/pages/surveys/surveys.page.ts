import {Page} from 'ionic-angular';
import {SurveysComponent} from '../../components/surveys/surveys.component';
import {OnInit, OnDestroy} from 'angular2/core';
import {SurveyService} from '../../service/survey.service';
import {StorageService} from '../../service/storage.service';
import {Survey} from '../../models/survey/survey';

@Page({
  templateUrl: 'build/pages/surveys/surveys.page.html',
  directives: [SurveysComponent],
  providers: [SurveyService],
})

export class SurveysPage implements OnInit, OnDestroy{


    // private _storageApi: StorageService;
    surveyQuestions: any;
    public surveys: Survey[];

    constructor(private _surveyApi: SurveyService, private _storageApi:StorageService) {

    }

    ngOnInit():any {
      this._surveyApi.surveys.subscribe(
        surveys => this.surveys = surveys,
        err => console.log('SurveysComponent subscribe error:', err),
        () =>  console.log('finished subscribing to surveys')
      );

      this._storageApi.surveyQuestions.subscribe(
        surveys => this.surveyQuestions = surveys,
        err => console.log('SurveysComponent subscribe error:', err),
        () =>  console.log('finished subscribing to surveys')
      );

      this._surveyApi.getSurveys();

      this._storageApi.saveSurveyProgress({
        id: 2,
        eventId: 4,
        name: "Name",
        questions: [{
          questionId: 68,
          text: "Question stinker",
          answer: {
            type: "answer",
            options: [{
              selected: true,
              value: "hey",
              display: "yes, hey",
            }]
          }
        }]
      });
      console.log(this.surveyQuestions);
    }

    ngOnDestroy() {
      this._surveyApi.surveys.unsubscribe();
      this._storageApi.surveyQuestions.unsubscribe();
    }
}
