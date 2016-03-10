import {Injectable, EventEmitter} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Question} from '../modules/survey/question';
import {Survey} from "../modules/survey/survey";
import {SurveyProgress} from "../modules/survey/surveyProgress";

@Injectable()
export class SurveyService {

    surveys:EventEmitter<Survey[]>;
    surveryQuestions:EventEmitter<Question[]>

    constructor(private http:Http) {
    };


    getSurveys = (id?:number):void => {};

    getSurveyResponses = (id:number, userId?:number):void => {};

    saveSurveyProgress = (survery:Survey):boolean => {
        return null;
    };

    getSurveyProgress = (id:any):SurveyProgress => {
        return null;
    };

    saveSurvey = (survey:Survey):boolean => {
        return null;
    };
}



