import {Component} from 'angular2/core';
import {Button, Item, Label, TextArea, Checkbox} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';

@Component({
  selector: 'survey',
  templateUrl: 'build/components/survey/survey.component.html',
  directives: [Button, Item, Label, TextArea, Checkbox],
  inputs: ['survey']
})

export class SurveyComponent {
  survey: Survey

  saveProgress(survey) {
    console.log(survey);
  }
}