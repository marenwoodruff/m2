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
  inputs: ['survey']
})

export class QuestionComponent implements OnInit {
  questions: Question[];
  survey: Survey;
  params: NavParams;
  currentQuestion: Question;
  questionIndex: number = 0;
  questionsLength: number;
  enabled: boolean = false;

  constructor(private _storageApi: StorageService, private nav: NavController) {
  }

  public ngOnInit(): void {
    this.questions = this.survey.questions;
    this.currentQuestion = this.questions[this.questionIndex];
    this.questionsLength = this.questions.length;

    if (this.questionIndex !== 0) {
      this.enabled = true;
    }
  }

  private changeSelection(option: Option): void {
    this.currentQuestion.answer.options.forEach(function(opt) {
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
    this._storageApi.removeSurveyProgress(1201);
    this.saveProgress(this.survey);
    if (this.questionIndex === this.questionsLength - 1) {
      this.nav.push(SurveyCompletedPage, {
        survey: this.questions
      });
    } else {
      this.questionIndex = this.questionIndex + 1;
      this.currentQuestion = this.questions[this.questionIndex];
    }

    this.evaluateIndex();
  }

  private previousQuestion(): void {
    if (this.questionIndex > 0) {
      this.questionIndex = this.questionIndex - 1;
      this.currentQuestion = this.questions[this.questionIndex];
    } else {
      console.log("first question, no previous")
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

  private onSubmit(survey): void {
    console.log('submitting', survey);
  }
}
