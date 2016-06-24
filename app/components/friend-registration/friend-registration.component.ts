import {Component, AfterContentInit} from '@angular/core';
import {Button, Label, Nav, NavParams, Alert} from 'ionic-angular';

import {EventsPage} from '../../pages/events/events.page';
import {Event} from '../../models/Events/event';

@Component({
  selector: 'friend-registration',
  templateUrl: 'build/components/friend-registration/friend-registration.component.html',
  directives: [Button, Label]
})

export class FriendRegistrationPage implements AfterContentInit {
  event: Event;

  constructor(private nav: Nav, private params: NavParams) { }

  ngAfterContentInit() {
    MktoForms2.loadForm("http://app-abm.marketo.com", "695-WVM-122", 1862);
  }

  registerFriend() {
    MktoForms2.whenReady((form) => {
      let valid = form.validate();
      if (valid === true) {
        this.confirmFriendRegistration();
      } else {
        console.log('form not valid');
      }
    });
  }

  confirmFriendRegistration() {
    let confirmFriend = Alert.create({
      title: 'Registration Confirmation',
      message: 'Thank you for registering! You will receive an e-mail to confirm your registration for this event.',
      buttons: [
        {
          text: 'Confirm',
          handler: () => {
            // form.submit();
            this.backToEvents();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel registration');
          }
        }
      ]
    });
    this.nav.present(confirmFriend);
  }

  backToEvents() {
    this.nav.setRoot(EventsPage);
  }

}
