import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {List, Item, NavController} from 'ionic-angular';
import {Event} from '../../models/events/event';
import {SessionComponent} from '../session/session.component';
import {EventLocationComponent} from '../event-location/event-location.component';

@Component({
  selector: 'event',
  templateUrl: 'build/components/event/event.component.html',
  inputs:['event'],
  directives: [List, Item, SessionComponent, EventLocationComponent],
})

export class EventComponent{}
