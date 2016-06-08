import {Component, OnInit} from '@angular/core';
import {Nav, NavParams, Button} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {EventsPage} from '../events/events.page';

@Component({
  templateUrl: 'build/pages/survey-completed/survey-completed.page.html',
  directives: [Button]
})

export class SurveyCompletedPage implements OnInit {
  nav: Nav
  params: NavParams;
  survey: Survey;

  constructor(nav: Nav, params: NavParams) {
    this.nav = nav;
    this.params = params;
    this.nav.swipeBackEnabled = false;
    // this.survey = this.params.get('survey');
  }

  ngOnInit() {
    console.log(this.nav.canSwipeBack());
  }

  navigateHomepage() {
    this.nav.setRoot(EventsPage);
  }

}
