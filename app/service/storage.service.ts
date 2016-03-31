import {Injectable, EventEmitter} from 'angular2/core';
import {Storage, SqlStorage} from 'ionic-angular';
import {Survey} from "../models/survey/survey";
import {Question} from "../models/survey/question";
import {SurveyProgress} from "../models/survey/surveyProgress";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class StorageService {

  surveyQuestions:EventEmitter<Question[]> = new EventEmitter();
  surveyProgress:EventEmitter<SurveyProgress[]> = new EventEmitter();
  public storage: Storage

    constructor() {
      this.storage = new Storage(SqlStorage, {name: 'SurveyResponse'});
    }
    public saveSurveyProgress(survey: Survey):void {
      console.log('saveSurveyProvgressSurvey: ', survey);
      console.log('Stringify Id', JSON.stringify(survey.id));
      console.log('Stringify Questions', JSON.stringify(survey.questions));



      this.storage.query(`insert into SurveyResponse (surveyId, responses) values(${JSON.stringify(survey.id)},
      "[
        {
          "questionId":68,
          "text":"Question stinker",
          "answer": {
            "type":"answer",
            "options": [
              {
                "selected":true,
                "value":"hey",
                "display":"yes, hey"
              }
            ]
          }
        }
      ]")`)
        .then((data) => {
          this.surveyQuestions.emit(data);
          console.log("Save Progress Completed -> ", JSON.stringify(data.res));
        }, (error) => {
          console.log("Save Progress ERROR -> " + JSON.stringify(error.err));
        });
    }
    public getSurveyProgress(id:any):void {
      this.storage.get(id)
        .then((data) => {
          this.surveyProgress.emit(data);
          console.log("Data: " + data);
        }, (error) => {
          console.log("Retrieve Progress ERROR -> " + JSON.stringify(error.err));
        });
    };
}
