import {Page} from 'ionic-angular';
import {OnInit} from 'angular2/core';

import {Matrix} from '../../modules/components/survey/survey.component';

@Page({
  templateUrl: 'build/pages/survey/survey.page.html',
  directives: [Matrix.MyMatrix.SurveyComponent]
})

export class SurveyPage implements OnInit {

  ngOnInit() {
    console.log(Matrix);
  }

}
  
