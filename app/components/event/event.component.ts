import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {SurveyService} from '../../service/survey.service';
import {List, Item, NavController} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {Event} from '../../models/events/event';

@Component({
  selector: 'event',
  templateUrl: 'build/modules/components/event/event.component.html',
  inputs:['event'],
  directives: [List, Item],
})

export class EventComponent{}
