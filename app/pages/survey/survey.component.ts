import {Page} from 'ionic-angular';

import {QuestionDirective} from '../../directives/question.directive';


@Page({
  templateUrl: 'build/pages/survey/survey.component.html',
  directives: [QuestionDirective],
})

export class SurveyComponent { }