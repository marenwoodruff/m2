import {Component} from 'angular2/core';
import {Button} from 'ionic-angular';

@Component({
  selector: 'survey',
  templateUrl: 'build/components/survey/survey.component.html',
  directives: [Button],
  inputs: ['survey']
})

export class SurveyComponent {

  saveProgress(survey) {
    console.log(survey);
  }
}