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
  private storage: Storage

    constructor() {
      this.initializeDb();
    }
    private initializeDb() {
      this.storage = new Storage(SqlStorage, {name: 'MatrixDB'});

      this.storage.query('CREATE TABLE IF NOT EXISTS Survey (surveyId, survey)')
        .then((data) => {
          console.log("TABLE CREATED -> " + JSON.stringify(data.res));
        }, (error) => {
          console.log("ERROR -> " + JSON.stringify(error.err));
        });
    }
    public saveSurveyProgress(survey: Survey):void {

      let surveyId = JSON.stringify(survey.id);
      let surveyObject = JSON.stringify(survey);

      this.storage.query(`INSERT INTO Survey (surveyId, survey) VALUES(?, ?)`, [surveyId, surveyObject])
        .then((data) => {
          this.surveyQuestions.emit(data.questions);
          console.log("Save Progress Completed -> ", JSON.stringify(data));
        }, (error) => {
          console.log("Save Progress ERROR -> " + error.err.sqlerror);
        });
    }
    public getSurveyProgress(id:any):void {
      this.storage.query(`SELECT * FROM Survey WHERE surveyId = ${id}`)
        .then((data) => {
          this.surveyProgress.emit(data);  //convert to survey object
          console.log("Data: " + data);
        }, (error) => {
          console.log("Retrieve Progress ERROR -> " + JSON.stringify(error.err));
        });
    }
    public removeSurveyProgress(id:any):void {
      this.storage.query(`DELETE FROM Survey WHERE surveyId = ${id}`)
        .then((data) => {
          console.log("Data: " + data);
        }, (error) => {
          console.log("Retrieve Progress ERROR -> " + JSON.stringify(error.err));
        });
    }
}
