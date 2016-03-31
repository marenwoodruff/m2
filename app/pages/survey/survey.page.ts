import {Component} from 'angular2/core';
import {Page, NavParams} from 'ionic-angular';
import {Question} from '../../models/survey/question';
import {QuestionComponent} from '../../components/question/question.component';
import {Survey} from '../../models/survey/survey';
import {StorageService} from '../../service/storage.service';

@Page({
  templateUrl: 'build/pages/survey/survey.page.html',
  directives: [QuestionComponent],
  providers: [StorageService]
})


export class SurveyPage{
  params: NavParams;
  survey: Survey;
  storage: any;

  constructor(params: NavParams, storage: StorageService) {
    this.params = params;
    this.survey = this.params.get('question');
    this.storage = storage;
    console.log('Service: ', this.storage);



  }
}
