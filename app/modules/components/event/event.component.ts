import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {List, Item, NavController} from 'ionic-angular';
import {SessionPage} from '../../../pages/session/session.page';

@Component({
  selector: 'event',
  templateUrl: 'build/modules/components/event/event.component.html',
  inputs:['event'],
  directives: [List, Item],
})

export class EventComponent{}
