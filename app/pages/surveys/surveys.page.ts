import {Page} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {SurveysComponent} from '../../modules/components/surveys/surveys.component';

@Page({
  templateUrl: 'build/pages/surveys/surveys.page.html',
  directives: [SurveysComponent]
})

export class SurveysPage { }
