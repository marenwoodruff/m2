import {Component} from 'angular2/core';
import {Page, NavParams} from 'ionic-angular';
import {QuestionComponent} from '../../components/question/question.component';
import {Survey} from '../../models/survey/survey';
import {StorageService} from '../../service/storage.service';

@Page({
  templateUrl: 'build/pages/survey/survey.page.html',
  directives: [QuestionComponent],
})

export class SurveyPage {
  params: NavParams;
  survey: Survey;
  storage: StorageService;
  inProgress: boolean;
  lastQuestionIndex: number;

  constructor(params: NavParams, storage: StorageService) {
    this.params = params;
    this.storage = storage;
    this.survey = this.params.get('survey');
    this.inProgress = this.params.get('inProgress');
    this.lastQuestionIndex = this.params.get('lastQuestionIndex');
    console.log(this.lastQuestionIndex);
  }

}
