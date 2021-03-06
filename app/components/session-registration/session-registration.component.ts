import {Component, Input, AfterContentInit, OnInit} from '@angular/core';
import {Button, List, Item, TextInput, Label, Nav, NavParams, Alert} from 'ionic-angular';

import {UserService} from '../../service/user.service';
import {UserEventService} from '../../service/userEvent.service';

import {EventPage} from '../../pages/event/event.page';
import {EventsPage} from '../../pages/events/events.page';

import {Event} from '../../models/Events/event';
import {User} from '../../models/user/user';

import AppSettings from '../../appSettings';

@Component({
  selector: 'session-registration',
  templateUrl: 'build/components/session-registration/session-registration.component.html',
  directives: [Button, List, Item, TextInput, Label],
  inputs: ['event', 'user']
})

export class SessionRegistrationPage implements OnInit, AfterContentInit {
  event: Event;
  userId: number;
  user: User;

  constructor(private _userApi:UserService, private _userEventApi:UserEventService, private nav: Nav, private params: NavParams) {}

  ngOnInit() {
    this.getUserInfo();
  }

  ngAfterContentInit() {
    MktoForms2.loadForm("http://app-abm.marketo.com", "695-WVM-122", 1862, (form) => {
        if (this.user) {
          let firstName = this.user.name.split(' ')[0];
          let lastName = this.user.name.split(' ')[1];

          form.vals({
            "FirstName": firstName,
            "LastName": lastName,
            "Company": this.user.company,
            "Title": this.user.jobTitle,
            "Phone": this.user.phone

          });
        }
    });
  }

  saveEvent() {
    let matrixEvent = this.event.nonMatrixEvent ? false : true ;
    let eventInfo = {
      eventId: this.event.eventId,
      title: this.event.title,
      registered: true,
      mobileSmall: this.event.mobileSmall,
      city: this.event.city,
      state: this.event.state,
      startDate: this.event.startDate,
      matrixEvent: matrixEvent
    }
    this.getUserInfo();
    this.submitForm(eventInfo);
  }

  registerFriend() {
    MktoForms2.whenReady((form) => {
      let valid = form.validate();
      if (valid === true) {
        this.confirmRegistration();
      }
    });
  }

  submitForm(eventInfo:any) {
    MktoForms2.whenReady((form) => {
      let vals = form.vals();
      let valid = form.validate();
      if (valid) {
        let userInfo = {
          id: this.userId,
          name: this.user.name,
          email: this.user.email,
          company: vals.Company,
          jobTitle: vals.Title,
          phone: vals.Phone,
          admin: this.user.admin,
          password: this.user.password,
          authenticationProvider: this.user.authenticationProvider
        }
        if (AppSettings.marketoRegistration) {
            form.submit();
        }
        this.confirmRegistration(eventInfo, userInfo);
      } else {
        console.log('form invalid');
      }
    });
  }

  confirmRegistration(eventInfo?:any, userInfo?:any) {
    let confirm = Alert.create({
      title: 'Registration Confirmation',
      message: 'Thank you for registering! You will receive an e-mail to confirm your registration for this event.',
      buttons: [
        {
          text: 'Confirm',
          handler: () => {
            this._userEventApi.createUserEvent(this.userId, eventInfo);
            this._userApi.updateUser(this.userId, userInfo);
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
    this.nav.present(confirm);  
  }


  backToEvents() {
    this.nav.setRoot(EventsPage);
  }

  getUserInfo() {
    this.userId = this._userApi.getUserId();
  }

}
