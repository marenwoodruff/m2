/**
 * Created by Abbey on 3/10/2016.
 */
import {Component} from 'angular2/core';
import {Event} from '../../models/events/event';
import {EventPage} from '../../pages/event/event.page';
import {Item, NavController} from 'ionic-angular';

@Component({
    selector: "eventListItem",
    templateUrl: 'build/components/events/eventListItem.component.html',
    directives: [Item, EventPage],
    inputs:['event']
})
export class EventListItemComponent{
    event:Event;
    navController: NavController;

    constructor(navController: NavController){
      this.navController = navController;
    }
    viewEvent(event) {
      this.navController.push(EventPage, { event });
    }
}
