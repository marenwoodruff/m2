import {Component, OnInit} from 'angular2/core';

import {QuestionComponent} from '../question/question.component';
import {AnswerComponent} from '../answer/answer.component';

export module Matrix.MyMatrix {

  @Component({
    selector: 'survey-component',
    templateUrl: 'build/modules/components/survey/survey.component.html',
    directives: [QuestionComponent, AnswerComponent]
  })

  export class SurveyComponent implements OnInit { 

    ngOnInit() {
      console.log('survey component');
    }
  }


}