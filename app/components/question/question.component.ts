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
  completed: boolean;

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
      this.checkSurveyCompletion(this.survey);
      this.nav.push(SurveyCompletedPage, {
        survey: this.survey
      });
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
    let completedQuestions = [];

    survey.questions.forEach((question) => {
      switch (question.answer.type) {
        case "radio":
          question.answer.options.forEach((option) => {
            if (option.selected) {
              completedQuestions.push(question.questionId);
            }
          });
          break;
        case "textBox":
          question.answer.options.forEach((option) => {
            if (option.value) {
              completedQuestions.push(question.questionId);
            }
          });
          break;
        case "checkBox":
          let checkboxAnswers = [];
          question.answer.options.forEach((option) => {
            if (option.selected) {
              checkboxAnswers.push(option.display);
            }            
          });
          completedQuestions.push(checkboxAnswers);
          break;
      }
    });

    if (completedQuestions.length === this.questionsLength) {
      this.completed = true;
      this._storageApi.removeSurveyProgress(this.survey.id);
      console.log('survey complete and deleted from local');
    } else {
      this._storageApi.updateSurveyProgress(this.survey);
      console.log('survey incomplete and updated in local');
    }
    
  }

  private onSubmit(survey): void {
    console.log('submitting', survey);
  }
}
