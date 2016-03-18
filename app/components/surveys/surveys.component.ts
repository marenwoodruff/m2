import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {List, Item} from 'ionic-angular';
import {SurveyDescriptionComponent} from '../survey-description/survey-description.component';

import {SurveyService} from '../../service/survey.service';
import {Survey} from '../../models/survey/survey';

@Component({
  selector: 'surveys',
  templateUrl: 'build/components/surveys/surveys.component.html',
  directives: [List, Item, SurveyDescriptionComponent],
  inputs:['surveys']
})

export class SurveysComponent {}