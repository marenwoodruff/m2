import {Component} from '@angular/core';
import {Page, NavParams, Nav} from 'ionic-angular';
import {QuestionComponent} from '../../components/question/question.component';
import {Survey} from '../../models/survey/survey';
import {StorageService} from '../../service/storage.service';

@Page({
  templateUrl: 'build/pages/survey/survey.page.html',
  directives: [QuestionComponent],
})

export class SurveyPage {
  survey: Survey;
  inProgress: boolean;
  lastQuestionIndex: number;

  constructor(private params: NavParams, private nav: Nav, private storage: StorageService) {
    this.nav.swipeBackEnabled = false;
    this.survey = this.params.get('survey');
    this.inProgress = this.params.get('inProgress');
    this.lastQuestionIndex = this.params.get('lastQuestionIndex');
  }

}
