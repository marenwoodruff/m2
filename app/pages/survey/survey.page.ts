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

  constructor(params: NavParams, storage: StorageService) {
    this.params = params;
    this.storage = storage;
    this.survey = this.params.get('survey');
  }
}
