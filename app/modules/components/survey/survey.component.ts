import {Component} from 'angular2/core';
import {Survey} from '../../survey/survey';
import {QuestionComponent} from '../question/question.component';
import {AnswerComponent} from '../answer/answer.component';


@Component({
  selector: 'survey',
  templateUrl: 'build/modules/components/survey/survey.component.html',
  directives: [QuestionComponent, AnswerComponent]
})

export class SurveyComponent { 
  survey: Survey;
}

