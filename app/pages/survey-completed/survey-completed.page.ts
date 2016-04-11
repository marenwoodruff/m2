import {Page} from 'ionic-angular';
import {NavController, NavParams, Button} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {EventsPage} from '../events/events.page';

@Page({
  templateUrl: 'build/pages/survey-completed/survey-completed.page.html',
  directives: [Button]
})

export class SurveyCompletedPage {
  nav: NavController
  params: NavParams;
  survey: Survey;

  constructor(nav: NavController, params: NavParams) {
    this.nav = nav;
    this.params = params;
    // this.survey = this.params.get('survey');
  }

  navigateHomepage() {
    this.nav.setRoot(EventsPage);
  }

}
