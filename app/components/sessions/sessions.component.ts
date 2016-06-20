import {Component} from '@angular/core';
import {List, Item, Button, Icon, Nav} from 'ionic-angular';
import {DateFormatPipe} from 'angular2-moment';
import {Session} from '../../models/events/session';
import {Location} from '../../models/events/location';
import {SessionPage} from '../../pages/session/session.page';
import {RegistrationPage} from '../../pages/registration/registration.page';


@Component({
  selector: 'sessions',
  templateUrl: 'build/components/sessions/sessions.component.html',
  directives: [List, Item, Button, Icon],
  inputs: ['sessions', 'location'],
  pipes: [DateFormatPipe]
})

export class SessionsComponent {
  constructor(private navController: Nav){ }

  goToSession(session: Session, location: Location) {
    this.navController.push(SessionPage, { session, location });
  }

  goToRegistration(session: Session) {
    this.navController.push(RegistrationPage, { session });
  }

}