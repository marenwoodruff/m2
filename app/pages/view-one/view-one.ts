import {Page} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import { user, survey, surveyResponse } from '../../modules/mockdata';

@Page({
  templateUrl: 'build/pages/view-one/view-one.html'
})
export class ViewOnePage implements OnInit {

    ngOnInit() {
        console.log(user);
        console.dir(survey);
        console.dir(surveyResponse);
    }

}
