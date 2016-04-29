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
  private surveys = [];

    constructor() {
      this.initializeDb();
    }

    public initializeDb() {
      let options = {
        name: '_ionicstorage',
        backupFlag: SqlStorage.BACKUP_LOCAL,
        existingDatabase: true
      };

      this.storage = new Storage(SqlStorage, options);

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

      this.storage.get('_ionicstorage').then((name) => {
        console.log('getting DB:', name);
      });

      this.storage.query(`SELECT * FROM Survey WHERE surveyId = '${id}'`)
        .then((data) => {
          let results = data.res.rows;
          console.log(results);
          for (var i = 0; i < results.length; i++) {
            if (results[i]) {
              this.surveys.push(JSON.parse(results[i].survey));
              this.surveyProgress.emit(this.surveys);
            }
          }
        }, (error) => {
          console.log("Retrieve Progress ERROR -> " + JSON.stringify(error.err));
        });
    }

    public removeSurveyProgress(id:number):void {
      this.storage.query(`DELETE FROM Survey WHERE surveyId = '${id}'`)
        .then((data) => {
          console.log("Data: " + data);
        }, (error) => {
          console.log("Retrieve Progress ERROR -> " + JSON.stringify(error.err));
        });
    }

    public updateSurveyProgress(survey: Survey): void {
      let surveyObject = JSON.stringify(survey);
      let surveyId = JSON.stringify(survey.id);

      console.log(surveyObject);

      this.storage.query(`UPDATE Survey SET survey = ? WHERE surveyId = ?`, [surveyObject, surveyId])
        .then((data) => {
          console.log('Updating Data: ' + data);
        }, (error) => {
          console.log('Update Progress ERROR -> ' + error.err.message);
        });
    }

    public getItem(key:string):string {
      return localStorage.getItem(key);
    }

    public setItem(key:string, value:string):void {
      localStorage.setItem(key, value);
    }

    public removeItem(key:string):void {
      localStorage.removeItem(key);
    }

}
