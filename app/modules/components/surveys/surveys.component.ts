import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {List, Item} from 'ionic-angular';
import {SurveyDescriptionComponent} from '../survey-description/survey-description.component';


@Component({
  selector: 'surveys',
  templateUrl: 'build/modules/components/surveys/surveys.component.html',
  directives: [List, Item, SurveyDescriptionComponent],
  inputs:['surveys']
})

export class SurveysComponent {}
