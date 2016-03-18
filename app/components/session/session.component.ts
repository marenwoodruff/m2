import {Component} from 'angular2/core';
import {List, Item} from 'ionic-angular';
import {DateFormatPipe} from 'angular2-moment';

@Component({
  selector: 'session',
  templateUrl: 'build/components/session/session.component.html',
  directives: [List, Item],
  inputs: ['session'],
  pipes: [DateFormatPipe]
})


export class SessionComponent {}
