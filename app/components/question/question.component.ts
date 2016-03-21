import {Component} from 'angular2/core';
import {Page, NavParams, Button} from 'ionic-angular';
import {Question} from '../../models/survey/question';
import {AnswerComponent} from '../answer/answer.component';
import {SurveyService} from '../../service/survey.service';
import {StorageService} from '../../service/storage.service';

@Component({
  selector: 'question',
  templateUrl: 'build/components/question/question.component.html',
  directives: [Button, AnswerComponent],
  providers: [SurveyService, StorageService],
  inputs: ['question']
})


export class QuestionComponent {
  private _surveyApi: SurveyService
  private _storageApi: StorageService;
  question: Question;
  saved: boolean = false;

  constructor(surveyService: SurveyService, storageService: StorageService) {
    this._surveyApi = surveyService;
    this._storageApi = storageService;
  }

  saveProgress(survey) {
    this.saved = true;
    this._storageApi.saveSurveyProgress(survey);
    return this.saved;
  }

  onSubmit(survey) {
    console.log('submitting', survey);
  }
}
