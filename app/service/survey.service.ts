import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Storage, LocalStorage} from 'ionic-angular';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {Question} from '../models/survey/question';
import {Survey} from "../models/survey/survey";

import {SurveyProgress} from "../models/survey/surveyProgress";
import {SurveyResponse} from "../models/survey/surveyResponse";

@Injectable()
export class SurveyService {

    private _api:Http;
    private storage: Storage;
    surveys:EventEmitter<Survey[]> = new EventEmitter();
    surveyQuestions:EventEmitter<Question[]> = new EventEmitter();
    surveyProgress:EventEmitter<SurveyProgress[]> = new EventEmitter();

    constructor(private http:Http) {
      this._api = http;
      this.storage = new Storage(LocalStorage, {name: 'responses'});
    };

    public getSurveys(eventId?:number):void {
      this._api.get("build/assets/survey.json")
        .map(res => <Survey[]>res.json())
        .subscribe(
        surveys => {surveys = eventId ? surveys.filter(s => s.eventId === eventId) : surveys;
        this.surveys.emit(surveys)},
        err => console.log('error: ', err),
        () => console.log('Surveys retrieval is completed')
      )
    };

    public getSurveyResponses(id:number, userId?:number):void {
      this._api.get("build/assets/surveyResponse.json")
          .map(res => <Question[]> res.json())
          .subscribe(
              surveyQuestions =>this.surveyQuestions.emit(surveyQuestions),
              err => console.log(err),
              () => console.log('Survey Questions retrieval is completed'));
    };

    public saveSurveyProgress(res: SurveyResponse):void {
      let data = JSON.stringify(res);
      this.storage.set('responses', data);
    };

    public getSurveyProgress(id:any):void {
      this.storage.get('responses');
    };

    public submitSurvey(survey:Survey):void {
      let surveyAnswers = this.storage.get('responses');
      this._api.post("build/assets/surveyComplete.json", surveyAnswers)
        .subscribe(
          err => console.log(err),
          () => console.log('Survey has been submitted'));
    };
}
