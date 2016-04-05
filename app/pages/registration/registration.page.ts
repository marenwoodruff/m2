import {Page, NavParams} from 'ionic-angular';
import {SessionRegistrationPage} from '../../components/session-registration/session-registration.component';
import {Event} from '../../models/events/event';

@Page({
  templateUrl: 'build/pages/registration/registration.page.html',
  directives: [SessionRegistrationPage]
})
export class RegistrationPage {
  event: Event;

  constructor(private params: NavParams) {
    this.event = this.params.get('event');
  }

}


