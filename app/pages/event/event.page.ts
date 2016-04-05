import {Page, NavParams, Platform} from 'ionic-angular';
import {OnInit, OnDestroy, forwardRef} from 'angular2/core';
import {EventComponent} from '../../components/event/event.component';
import {SurveysComponent} from '../../components/surveys/surveys.component';
import {SessionsComponent} from '../../components/sessions/sessions.component';
import {Survey} from '../../models/survey/survey';
import {Event} from '../../models/events/event';

@Page({
    templateUrl: 'build/pages/event/event.page.html',
    directives: [EventComponent, forwardRef(() => SurveysComponent), SessionsComponent],
    // providers:[SurveyService]

})



export class EventPage implements OnInit, OnDestroy{
  params: NavParams;
  event: Event;
  public surveys: Survey[];
 platform:Platform;
  constructor(navParams: NavParams, platform: Platform) {
    this.params = navParams;
    this.platform = platform;
  }

  ngOnInit():any{
    this.event = this.params.get('event');

  }
  ngOnDestroy() {
  }

  share(message, subject, file, link) {
    this.platform.ready().then(() => {
            if (window.plugins.socialsharing) {
                window.plugins.socialsharing.share('General share Message', null, null, null);;
            }
        });
  }

}
