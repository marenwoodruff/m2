import {Component, OnInit} from 'angular2/core';
import {Button, NavController, NavParams} from 'ionic-angular';
import {Question} from '../../models/survey/question';
import {AnswerComponent} from '../answer/answer.component';
import {SurveyService} from '../../service/survey.service';
import {Survey} from '../../models/survey/survey';
import {StorageService} from '../../service/storage.service';
import {SurveyCompletedPage} from '../../pages/survey-completed/survey-completed.page';

@Component({
  selector: 'question',
  templateUrl: 'build/components/question/question.component.html',
  directives: [Button, AnswerComponent],
  providers: [SurveyService, StorageService],
  inputs: ['questions']
})


export class QuestionComponent implements OnInit {
  private _surveyApi: SurveyService;
  private _storageApi: StorageService;
  questions: Question[];
  survey: Survey;
  nav: NavController;
  params: NavParams;
  currentQuestion: Question;
  questionIndex: number = 0;
  questionsLength: number;
  enabled: boolean = false;
  disabled: boolean = true;
  clear: "clear";

  ngOnInit() {
    this.currentQuestion = this.questions[this.questionIndex];
    this.questionsLength = this.questions.length;

    if (this.questionIndex !== 0) {
      this.disabled = false;
      this.enabled = true;
    }

    return this.currentQuestion;
  }

  constructor(surveyService: SurveyService, storageService: StorageService, nav: NavController) {
    this._surveyApi = surveyService;
    this._storageApi = storageService;
    this.nav = nav;
  }

  saveProgress(survey) {
    this._storageApi.saveSurveyProgress(survey);
  }

  skipQuestion() {
    if (this.questionIndex >= this.questionsLength) {
    } else {
      this.questionIndex = this.questionIndex + 1;
      this.currentQuestion = this.questions[this.questionIndex];
    }
  }

  nextQuestion() {
    if (this.questionIndex === this.questionsLength - 1) {
      this.nav.push(SurveyCompletedPage, {
        survey: this.survey
      });
    } else {
      this.questionIndex = this.questionIndex + 1;
      this.currentQuestion = this.questions[this.questionIndex];
    }

    if (this.questionIndex !== 0) {
      this.disabled = false;
      this.enabled = true;
    } else {
      this.disabled = true;
      this.enabled = false;
    }
  }

  previousQuestion() {
    if (this.questionIndex > 0) {
      this.questionIndex = this.questionIndex - 1;
      this.currentQuestion = this.questions[this.questionIndex];
    } else {
      console.log("first question, no previous")
    }

    if (this.questionIndex !== 0) {
      this.disabled = false;
      this.enabled = true;
    } else {
      this.disabled = true;
      this.enabled = false;
    }

  }

  onSubmit(survey) {
    console.log('submitting', survey);
  }
}
