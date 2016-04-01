import {Component} from 'angular2/core';
import {List, Item, Button} from 'ionic-angular';
import {Event} from '../../models/events/event';
import {SessionComponent} from '../session/session.component';
import {EventLocationComponent} from '../event-location/event-location.component';
import {DateFormatPipe, FromUnixPipe} from 'angular2-moment';

@Component({
  selector: 'event',
  templateUrl: 'build/components/event/event.component.html',
  inputs:['event'],
  directives: [List, Item, SessionComponent, EventLocationComponent, Button],
  pipes:[DateFormatPipe, FromUnixPipe]
})

export class EventComponent{}
