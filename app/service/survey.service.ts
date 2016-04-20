import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {Question} from '../models/survey/question';
import {Survey} from "../models/survey/survey";

import {SurveyProgress} from "../models/survey/surveyProgress";
import {SurveyResponse} from "../models/survey/surveyResponse";

import {HttpClient} from './http-client.service';


@Injectable()
export class SurveyService {

    surveys:EventEmitter<Survey[]> = new EventEmitter();
    surveyComplete: EventEmitter<boolean> = new EventEmitter();
    surveyById: EventEmitter<Survey> = new EventEmitter();
    surveyResponse: SurveyResponse;

    constructor(private _api:Http, private _clientApi:HttpClient) {};

    public getSurveys(id?:number, eventId?:number):void {
      // let headers = new Headers();
      // headers.append('Access-Control-Allow-Origin', '*');
      this._clientApi.get("surveys")
        .map(res => <Survey[]>res.json())
        .subscribe(
          surveys => {
            console.log(surveys);
            surveys = eventId ? surveys.filter(s => s.eventId === eventId) : surveys;
            surveys = id ? surveys.filter(s => s.id === id) : surveys;
            this.surveys.emit(surveys)
          },
          err => console.log('error: ', err),
          () => console.log('Surveys retrieval is completed')
        );
    }

    public getSurveyById(id:number):void {
      this._clientApi.get("surveys/" + id)
        .map(res => <Survey>res.json())
        .subscribe(
          survey => this.surveyById.emit(survey),
          err => console.log('error: ', err),
          () => console.log('retrieved survey with id:', id)
        );
    }

    public submitSurvey(survey:Survey, surveyResponse:SurveyResponse):void {
      let surveyAnswers = survey.questions;
      let response = JSON.stringify(surveyResponse);
      this._clientApi.post('surveys/' + survey.id + '/responses', response)
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
