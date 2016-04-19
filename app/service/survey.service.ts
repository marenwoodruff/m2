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
      let headers = new Headers();
      headers.append('Authorization', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoibmljayIsIlBhc3N3b3JkIjoiekdlZkc0aXJzQi9vUnBaN0dCVk1kYUxPcDBxQ2sxQ0xTN1NsYkpLSFFqUT0iLCJDb21wYW55IjoibWF0cml4IiwiSm9iVGl0bGUiOiJtYXN0ZXIgb2Yga2FyYXRlIiwiRW1haWwiOiJuaWNob2xhcy5sZWFjaEBtYXRyaXhyZXMuY29tIiwiUGhvbmUiOm51bGwsIklkIjoxLCJBZG1pbiI6dHJ1ZSwiUmVzcG9uc2VzIjpbXSwiVXNlckF1dGhlbnRpY2F0aW9ucyI6W10sIlVzZXJFdmVudHMiOltdLCJVc2VyU3VydmV5cyI6W119.6PMU7kTMk3AFPSuw3SIo62iN-k4sBc0uLv63x_6Y5-NZtsZrCJQ7QF1sGupioQmm');
      headers.append('Content-Type', 'application/json');
      let surveyAnswers = survey.questions;
      let response = JSON.stringify(surveyResponse);
      this._clientApi.post('surveys/' + survey.id + '/responses', headers, response)
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
