import {Component} from 'angular2/core';
import {List, Item, Button, Icon, NavController} from 'ionic-angular';
import {DateFormatPipe} from 'angular2-moment';

@Component({
  selector: 'sessions',
  templateUrl: 'build/components/sessions/sessions.component.html',
  directives: [List, Item, Button, Icon],
  inputs: ['sessions'],
  pipes: [DateFormatPipe]
})


export class SessionsComponent {
  navController: NavController;

  constructor(navController: NavController){
    this.navController = navController;
  }

}
