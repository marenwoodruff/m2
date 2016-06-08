import {Component, OnInit} from '@angular/core';
import {Alert, Button, List, Item, Label, RadioButton, RadioGroup, Checkbox, Icon, Toolbar,  NavController, NavParams} from 'ionic-angular';
import {Question} from '../../models/survey/question';
import {Survey} from '../../models/survey/survey';
import {Option} from '../../models/survey/option';
import {StorageService} from '../../service/storage.service';
import {SurveyService} from '../../service/survey.service';
import {SurveyCompletedPage} from '../../pages/survey-completed/survey-completed.page';
import {EventsPage} from '../../pages/events/events.page';
import {SurveyResponse} from '../../models/survey/surveyResponse';

@Component({
  selector: 'question',
  templateUrl: 'build/components/question/question.component.html',
  directives: [Button, List, Item, Label, RadioButton, RadioGroup, Checkbox, Icon, Toolbar],
  inputs: ['survey', 'lastQuestionIndex', 'inProgress']
})

export class QuestionComponent implements OnInit {
  questions: Question[];
  survey: Survey;
  params: NavParams;
  currentQuestion: Question;
  lastQuestionIndex: number;
  questionIndex: number = 0;
  questionsLength: number;
  enabled: boolean;
  inProgress: boolean;
  completed: boolean;
  completedQuestions = [];

  constructor(private _storageApi: StorageService, private _surveyApi: SurveyService, private nav: NavController) { }

  public ngOnInit(): void {
    this.questions = this.survey.questions;
    this.questionIndex = this.lastQuestionIndex ? this.lastQuestionIndex + 1 : 0;
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
      this.checkSurveyCompletion(this.survey);
    } else {
      this.enabled = true;
      this.questionIndex = this.questionIndex + 1;
      this.currentQuestion = this.questions[this.questionIndex];
    }
  }

  private nextQuestion(): void {
    if (this.questionIndex === this.questionsLength - 1) {
      this.checkSurveyCompletion(this.survey);
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

  private evaluateIndex(): void {
    if (this.questionIndex !== 0) {
      this.enabled = true;
    } else {
      this.enabled = false;
    }
  }

  private getAnswers(survey: Survey): void {
    survey.questions.forEach((question) => {
      switch (question.answer.type) {
        case "radio":
          question.answer.options.forEach((option) => {
            if (option.selected) {
              this.completedQuestions.push(question.id);
            }
          });
          break;
        case "textBox":
          question.answer.options.forEach((option) => {
            if (option.value) {
              this.completedQuestions.push(question.id);
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
          this.completedQuestions.push(checkboxAnswers);
          break;
      }
    }); 
  }

  private checkSurveyCompletion(survey: Survey): void {
    this.getAnswers(survey);
    if (this.completedQuestions.length === this.questionsLength) {
      this.completed = true;
      this._storageApi.removeSurveyProgress(this.survey.id);
      this.processSurvey(survey);
      console.log('survey complete and deleted from local');
      this.nav.push(SurveyCompletedPage);
    } else {
      this._storageApi.updateSurveyProgress(this.survey);
      console.log('survey incomplete and updated in local');
      this.incompleteAlert();
    }
    
  }

  private processSurvey(survey:Survey) {
    let surveyResponse = new SurveyResponse();
    let surveyAnswers = [];
    survey.eventId ? surveyResponse.eventId = survey.eventId : surveyResponse.eventId;
    survey.eventTitle ? surveyResponse.eventTitle = survey.eventTitle : surveyResponse.eventTitle;
    survey.questions.forEach((question) => {
      question.answer.options.forEach((option) => {
        switch (question.answer.type) {
          case "radio":
            if (option.selected) {
              surveyAnswers.push({ questionId: question.id, value: option.display });
            }
            break;
          case "textBox":
            if (option.value) {
              surveyAnswers.push({ questionId: question.id, value: option.value });
            }
            break;
          case "checkBox":
            let checkBoxAnswers = [];
            if (option.selected) {
              checkBoxAnswers.push(option.display);
            }
            surveyAnswers.push({ questionId: question.id, value: checkBoxAnswers });
            break;
        }
      });
      surveyResponse.answers = surveyAnswers;
      return surveyResponse;
    });  
    this._surveyApi.submitSurvey(survey, surveyResponse);
  }

  private incompleteAlert(): void {
    let confirm = Alert.create({
      title: 'You are so close to being done!',
      message: 'Are you sure you want to leave this survey without finishing?',
      buttons: [
        {
          text: 'Yes, Please',
          handler: () => {
            this.nav.setRoot(EventsPage);
          }
        },
        {
          text: 'No, I will finish',
          handler: () => {
            console.log('gonna keep going');
          },
          buttons: ['Dismiss']
        }]
    });
    this.nav.present(confirm);
  }
}
