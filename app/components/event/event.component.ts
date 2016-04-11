import {Component} from 'angular2/core';
import {NavController, NavParams, List, Item, Button, Platform} from 'ionic-angular';
import {Event} from '../../models/events/event';
import {SessionComponent} from '../session/session.component';
import {EventLocationComponent} from '../event-location/event-location.component';
import {DateFormatPipe, FromUnixPipe} from 'angular2-moment';
import {RegistrationPage} from '../../pages/registration/registration.page';

@Component({
  selector: 'event',
  templateUrl: 'build/components/event/event.component.html',
  inputs:['event'],
  directives: [List, Item, SessionComponent, EventLocationComponent, Button],
  pipes:[DateFormatPipe, FromUnixPipe]
})

export class EventComponent{
  event: Event

  constructor(private nav: NavController, private platform: Platform) {
  }

  private register(event): void {
    this.nav.push(RegistrationPage, {
      event: event
    });
  }

  public launchUrl(url: string): void {
    // this.platform.ready().then(() => {
    //   window.open(url, "_system", "location=true");
    // });
    this.platform.ready().then(() => {
      cordova.InAppBrowser.open(url, "_system", "location=true");
    });
  }
}