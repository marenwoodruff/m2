import {Page, NavParams} from 'ionic-angular';
import {AfterContentInit} from 'angular2/core';
import {SessionRegistrationPage} from '../../components/session-registration/session-registration.component';
import {Event} from '../../models/events/event';

@Page({
  templateUrl: 'build/pages/registration/registration.page.html',
  directives: [SessionRegistrationPage]
})
export class RegistrationPage implements AfterContentInit {
  event: Event;

  constructor(private params: NavParams) {
    this.event = this.params.get('event');
  }

  ngAfterContentInit() {
    MktoForms2.loadForm("//app-abm.marketo.com", "695-WVM-122", 1862);
  }

}


