import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {SurveyService} from '../../service/survey.service';
import {List, Item, NavController} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {Event} from '../../models/events/event';
import {SessionComponent} from '../session/session.component';

@Component({
  selector: 'event',
  templateUrl: 'build/components/event/event.component.html',
  inputs:['event'],
  directives: [List, Item, SessionComponent],
})

export class EventComponent{}
