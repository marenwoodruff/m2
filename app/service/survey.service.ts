import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {Question} from '../modules/survey/question';
import {Survey} from "../modules/survey/survey";
import {SurveyProgress} from "../modules/survey/surveyProgress";

@Injectable()
export class SurveyService {

    private _api:Http;
    surveys:EventEmitter<Survey[]> = new EventEmitter();
    surveyQuestions:EventEmitter<Question[]> = new EventEmitter();
    surveyProgress:EventEmitter<SurveyProgress[]> = new EventEmitter();

    constructor(private http:Http) {
      this._api = http;
    };

    public getSurveys(id?:number):void {
      this._api.get("build/assets/survey.json")
        .map(res => <Survey[]>res.json())
        .subscribe(
        surveys => this.surveys.emit(surveys),
        err => console.log('error: ', err),
        () => console.log('Surveys retrieval is completed')
      );
    };

    public getSurveyResponses(id:number, userId?:number):void {
      this._api.get("build/assets/surveyResponse.json")
          .map(res => <Question[]> res.json())
          .subscribe(
              surveyQuestions =>this.surveyQuestions.emit(surveyQuestions),
              err => console.log(err),
              () => console.log('Survey Questions retrieval is completed'));
    };

    saveSurveyProgress(survey:Survey):boolean {
        return null;
    };

    public getSurveyProgress(id: any):void {
      this._api.get("build/assets/surveyResponse.json")
          .map(res => <SurveyProgress[]> res.json())
          .subscribe(
              surveyProgress =>this.surveyProgress.emit(surveyProgress),
              err => console.log(err),
              () => console.log('Survey Progress retrieval is completed'));
    };

    saveSurvey(survey:Survey):boolean {
        return null;
    };
}
