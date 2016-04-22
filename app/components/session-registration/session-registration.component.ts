import {Component, Input, AfterContentInit} from 'angular2/core';
import {Button, List, Item, TextInput, Label, NavController, NavParams, Alert} from 'ionic-angular';

import {UserService} from '../../service/user.service';
import {UserEventService} from '../../service/userEvent.service';

import {EventPage} from '../../pages/event/event.page';
import {EventsPage} from '../../pages/events/events.page';

import {Event} from '../../models/Events/event';

@Component({
  selector: 'session-registration',
  templateUrl: 'build/components/session-registration/session-registration.component.html',
  directives: [Button, List, Item, TextInput, Label],
  inputs: ['event']
})

export class SessionRegistrationPage implements AfterContentInit {
  event: Event; 
  userId: number;

  constructor(private _userApi:UserService, private _userEventApi:UserEventService, private nav: NavController, private params: NavParams) {}

  ngAfterContentInit() {
    MktoForms2.loadForm("http://app-abm.marketo.com", "695-WVM-122", 1862);
  }

  saveEvent() {   
    let eventInfo = {
      eventId: this.event.eventId,
      title: this.event.title,
      registered: true,
      mobileSmall: this.event.mobileSmall,
      city: this.event.city,
      state: this.event.state,
      startDate: this.event.startDate
    }
    this.getUserInfo();
    this.submitForm(eventInfo);
  }

  submitForm(eventInfo:any) {
    MktoForms2.whenReady((form) => {
      let valid = form.validate();
      if (valid) {
        this._userEventApi.createUserEvent(this.userId, eventInfo);
        this.confirmRegistration();
      } else {
        console.log('form invalid');
      }
    });
  }

  confirmRegistration() {
    let confirm = Alert.create({
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
          handler: () => {
            console.log('cancel registration');
          }
        }
      ]
    });
    this.nav.present(confirm);
  }

  backToEvents() {
    this.nav.setRoot(EventsPage);
  }

  getUserInfo() {
    this.userId = this._userApi.getUserId();
  }

}
