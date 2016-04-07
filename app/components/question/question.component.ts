import {Component, OnInit} from 'angular2/core';
import {Button, List, Item, Label, RadioButton, RadioGroup, Checkbox, Icon, Toolbar,  NavController, NavParams} from 'ionic-angular';
import {Question} from '../../models/survey/question';
import {Survey} from '../../models/survey/survey';
import {Option} from '../../models/survey/option';
import {StorageService} from '../../service/storage.service';
import {SurveyCompletedPage} from '../../pages/survey-completed/survey-completed.page';

@Component({
  selector: 'question',
  templateUrl: 'build/components/question/question.component.html',
  directives: [Button, List, Item, Label, RadioButton, RadioGroup, Checkbox, Icon, Toolbar],
  inputs: ['survey', 'inProgress']
})

export class QuestionComponent implements OnInit {
  questions: Question[];
  survey: Survey;
  params: NavParams;
  currentQuestion: Question;
  questionIndex: number = 0;
  questionsLength: number;
  enabled: boolean;
  inProgress: boolean;

  constructor(private _storageApi: StorageService, private nav: NavController) { }

  public ngOnInit(): void {
    this.questions = this.survey.questions;
    this.currentQuestion = this.questions[this.questionIndex];
    this.questionsLength = this.questions.length;

    if (this.questionIndex !== 0) {
      this.enabled = true;
    }

    if (!this.inProgress) {
      this.saveProgress(this.survey);
    } 
  }

  private changeSelection(option: Option): void {
    this.currentQuestion.answer.options.forEach((opt:Option) => {
      if (option.value === opt.value) {
        opt.selected = true;
      } else {
        opt.selected = false;
      }
    });
  }

  private saveProgress(survey: Survey): void {
    this._storageApi.saveSurveyProgress(survey);
  }

  private skipQuestion(): void {
    if (this.questionIndex === this.questionsLength - 1) {
      this.nav.push(SurveyCompletedPage, {
        survey: this.questions
      });
    } else {
      this.questionIndex = this.questionIndex + 1;
      this.currentQuestion = this.questions[this.questionIndex];
    }
  }

  private nextQuestion(): void {

    if (this.questionIndex === this.questionsLength - 1) {
      this._storageApi.updateSurveyProgress(this.survey);
      this.checkSurveyCompletion(this.survey);
      // this.nav.push(SurveyCompletedPage, {
      //   survey: this.survey
      // });
    } else {
      this._storageApi.updateSurveyProgress(this.survey);
      this.questionIndex = this.questionIndex + 1;
      this.currentQuestion = this.questions[this.questionIndex];
    }

    this.evaluateIndex();
  }

  private previousQuestion(): void {
    if (this.questionIndex > 0) {
      this.questionIndex = this.questionIndex - 1;
      this.currentQuestion = this.questions[this.questionIndex];
    } 

    this.evaluateIndex();
  }

  private evaluateIndex() {
    if (this.questionIndex !== 0) {
      this.enabled = true;
    } else {
      this.enabled = false;
    }
  }

  private checkSurveyCompletion(survey: Survey): void {
    console.log('checking survey completion of: ', survey);
    survey.questions.forEach((question) => {
      switch (question.answer.type) {
        case "radio":
          console.log('radio', question);
          break;
        case "textBox":
          console.log('textbox', question);
          break;
        case "checkBox":
          console.log('checkbox', question);
          break;
      }
    });
  }

  private onSubmit(survey): void {
    console.log('submitting', survey);
  }
}
