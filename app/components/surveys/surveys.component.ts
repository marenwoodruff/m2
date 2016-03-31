import {Component, forwardRef} from 'angular2/core';
import {List, Item} from 'ionic-angular';
import {SurveyDescriptionComponent} from '../survey-description/survey-description.component';

@Component({
  selector: 'surveys',
  templateUrl: 'build/components/surveys/surveys.component.html',
  directives: [List, Item, forwardRef(() => SurveyDescriptionComponent)],
  inputs:['surveys']
})

export class SurveysComponent { }
