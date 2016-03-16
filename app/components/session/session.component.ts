import {Component, Input} from 'angular2/core';
import {List, Item} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {Event} from '../../models/events/event';

@Component({
  selector: 'session',
  templateUrl: 'build/modules/components/session/session.component.html',
  inputs:['session'],
  directives: [List, Item]
})

export class SessionComponent{

  constructor() {

  }

}
