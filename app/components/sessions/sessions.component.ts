import {Component} from 'angular2/core';
import {List, Item} from 'ionic-angular';
import {DateFormatPipe} from 'angular2-moment';

@Component({
  selector: 'sessions',
  templateUrl: 'build/components/sessions/sessions.component.html',
  directives: [List, Item],
  inputs: ['sessions'],
  pipes: [DateFormatPipe]
})


export class SessionsComponent {}
