import {Component} from 'angular2/core';
import {Item} from 'ionic-angular';
import {Survey} from '../../survey/survey';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'survey',
  templateUrl: 'build/modules/components/survey/survey.component.html',
  directives: [Item, QuestionComponent],
  inputs:['survey']
})

export class SurveyComponent { 
  survey: Survey;
}

