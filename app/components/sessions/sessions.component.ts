import {Component} from 'angular2/core';
import {List, Item, Button, Icon, NavController} from 'ionic-angular';
import {DateFormatPipe} from 'angular2-moment';
import {Session} from '../../models/events/session';
import {Location} from '../../models/events/location';
import {SessionPage} from '../../pages/session/session.page';
import {SessionRegistrationPage} from '../../pages/session-registration/session-registration.page';

@Component({
  selector: 'sessions',
  templateUrl: 'build/components/sessions/sessions.component.html',
  directives: [List, Item, Button, Icon],
  inputs: ['sessions', 'location'],
  pipes: [DateFormatPipe]
})

export class SessionsComponent {
  navController: NavController;
  constructor(navController: NavController){
    this.navController = navController;
  }

  goToSession(session: Session, location: Location) {
    this.navController.push(SessionPage, { session, location });
  }

  goToRegistration(session: Session) {
    this.navController.push(SessionRegistrationPage, { session });
  }

}
