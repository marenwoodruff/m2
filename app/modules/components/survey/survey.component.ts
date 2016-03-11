import {Component} from 'angular2/core';
import {Survey} from '../../survey/survey';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'survey',
  templateUrl: 'build/modules/components/survey/survey.component.html',
  directives: [QuestionComponent]
})

export class SurveyComponent { 
  survey: Survey;
}

