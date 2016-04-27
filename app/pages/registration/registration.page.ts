import {Page, NavParams} from 'ionic-angular';
import {SessionRegistrationPage} from '../../components/session-registration/session-registration.component';
import {Event} from '../../models/events/event';
import {User} from '../../models/user/user';

@Page({
  templateUrl: 'build/pages/registration/registration.page.html',
  directives: [SessionRegistrationPage]
})
export class RegistrationPage {
  event: Event;
  user: User;

  constructor(private params: NavParams) {
    this.event = this.params.get('event');
    this.user = this.params.get('user');
  }
}


