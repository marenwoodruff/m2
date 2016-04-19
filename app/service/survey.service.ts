import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {Question} from '../models/survey/question';
import {Survey} from "../models/survey/survey";

import {SurveyProgress} from "../models/survey/surveyProgress";
import {SurveyResponse} from "../models/survey/surveyResponse";


@Injectable()
export class SurveyService {

    surveys:EventEmitter<Survey[]> = new EventEmitter();
    surveyComplete: EventEmitter<boolean> = new EventEmitter();
      
    constructor(private _api:Http) {};

    public getSurveys(id?:number, eventId?:number):void {
      this._api.get("build/assets/survey.json")
        .map(res => <Survey[]>res.json())
        .subscribe(
        surveys => {
          surveys = eventId ? surveys.filter(s => s.eventId === eventId) : surveys;
          surveys = id ? surveys.filter(s => s.id === id) : surveys;
          this.surveys.emit(surveys)
        },
        err => console.log('error: ', err),
        () => console.log('Surveys retrieval is completed')
      )
    };

    public submitSurvey(survey:Survey):void {
      let surveyAnswers = JSON.stringify(survey.questions);
      this._api.post("build/assets/surveyComplete.json", surveyAnswers)
      .subscribe(
        err => console.log(err),
        () => console.log('Survey has been submitted'));
    };

    public surveyCompleted(completed:boolean):void {
      this.surveyComplete.emit(completed);
      console.log('EMITTEDDDDDDD');
    }

    // public getSurveyResponses(id:number, userId?:number):void {
    //   this._api.get("build/assets/surveyResponse.json")
    //       .map(res => <Question[]> res.json())
    //       .subscribe(
    //           surveyQuestions =>this.surveyQuestions.emit(surveyQuestions),
    //           err => console.log(err),
    //           () => console.log('Survey Questions retrieval is completed'));
    // };
    //
    // public saveSurveyProgress(res: SurveyResponse):void {
    //   let data = res;
    //
    // };
    //
    // public getSurveyProgress(id:any):void {
    //   this.storage.get('responses');
    // };

}
