import {Component} from 'angular2/core';

import {SurveyComponent} from '../survey/survey.component';

@Component({
  selector: 'surveys',
  templateUrl: 'build/modules/components/surveys/surveys.component.html',
  directives: [SurveyComponent]
})

export class SurveysComponent { }