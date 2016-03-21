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
  private storage: Storage;

    constructor() {
      this.storage = new Storage(SqlStorage, {name: 'responses'});
      this.storage.query('CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY AUTOINCREMENT, surveyId TEXT, responses TEXT)')
        .then((data) => {
          console.log("TABLE CREATED -> " + JSON.stringify(data.res));
        }, (error) => {
          console.log("ERROR -> " + JSON.stringify(error.err));
        });
    }
    public saveSurveyProgress(res: Survey):void {
      let data = res;
      this.storage.query(`INSERT INTO responses (surveyId, responses) VALUES (${data.id}, ${data.questions})`)
        .then((data) => {
          this.surveyQuestions.emit(data);
          console.log(JSON.stringify(data.res));
        }, (error) => {
          console.log("ERROR -> " + JSON.stringify(error.err));
        });
    }
    public getSurveyProgress(id:any):void {
      this.storage.query('SELECT * FROM responses')
        .then((data) => {
          this.surveyProgress.emit(data);
          console.log("Data: " + data);
        }, (error) => {
          console.log("ERROR -> " + JSON.stringify(error.err));
        });
    };
}
