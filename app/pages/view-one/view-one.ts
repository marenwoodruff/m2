import {Page, OnInit} from 'ionic-angular';
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
