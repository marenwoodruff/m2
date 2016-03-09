import {Injectable, EventEmitter} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

export module Matrix.MyMatrix {

    @Injectable()
    export class SurveyService {

        surveys:EventEmitter<Survey[]>;
        //TODO:  Change the type to Survey type

        constructor(private http:Http) {
        };

        getSurveys = (id?:number):void => {
            //TODO: change return type to array of Survey

            return null;
        };

        getSurveyResponses = (id:number, userId?:number):any => {
            //TODO: change return type to array of Question[]

            return null;
        };

        saveSurveyProgress = (id:any):boolean => {
            return null;
        };

        getSurveyProgress = (id:any):any =>{
            //TODO: change return type to SurveyProgress

            return null;

        };

        saveSurvey = (survey:any):boolean => {
            //TODO: change survey param type to Survey type
            return null;
        };
    }
}
