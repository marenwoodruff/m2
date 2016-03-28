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
  questions: Question[];
  survey: Survey;
  params: NavParams;
  currentQuestion: Question;
  questionIndex: number = 0;
  questionsLength: number;
  enabled: boolean = false;
  disabled: boolean = true;

  constructor(private surveyService: SurveyService, private storageService: StorageService, private nav: NavController) {
  }

  public ngOnInit(): void {
    this.currentQuestion = this.questions[this.questionIndex];
    this.questionsLength = this.questions.length;

    if (this.questionIndex !== 0) {
      this.disabled = false;
      this.enabled = true;
    }

  }

  private saveProgress(survey): void {
    this.storageService.saveSurveyProgress(survey);
  }

  private skipQuestion(): void {
    if (this.questionIndex >= this.questionsLength) {
    } else {
      this.questionIndex = this.questionIndex + 1;
      this.currentQuestion = this.questions[this.questionIndex];
    }
  }

  private nextQuestion(): void {
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

  private previousQuestion(): void {
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

  private onSubmit(survey): void {
    console.log('submitting', survey);
  }
}
