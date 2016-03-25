import {Component, OnInit} from 'angular2/core';
import {Button} from 'ionic-angular';
import {Question} from '../../models/survey/question';
import {AnswerComponent} from '../answer/answer.component';
import {SurveyService} from '../../service/survey.service';
import {StorageService} from '../../service/storage.service';

@Component({
  selector: 'question',
  templateUrl: 'build/components/question/question.component.html',
  directives: [Button, AnswerComponent],
  providers: [SurveyService, StorageService],
  inputs: ['questions']
})


export class QuestionComponent implements OnInit {
  private _surveyApi: SurveyService
  private _storageApi: StorageService;
  questions: Question;
  currentQuestion: Question;
  questionIndex: number = 0;

  ngOnInit() {
    this.currentQuestion = this.questions[this.questionIndex];
    return this.currentQuestion;
  }

  constructor(surveyService: SurveyService, storageService: StorageService) {
    this._surveyApi = surveyService;
    this._storageApi = storageService;
  }

  saveProgress(survey) {
    this._storageApi.saveSurveyProgress(survey);
  }

  onSubmit(survey) {
    console.log('submitting', survey);
  }
}
