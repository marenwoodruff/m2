import {Component, OnChanges} from 'angular2/core';
import {Event} from '../../models/events/event';
import {EventPage} from '../../pages/event/event.page';
import {Item, NavController, Button} from 'ionic-angular';
import {DateFormatPipe, FromUnixPipe} from 'angular2-moment';

@Component({
    selector: "eventListItem",
    templateUrl: 'build/components/events/eventListItem.component.html',
    directives: [Item, EventPage, Button],
    inputs:['event', 'location'],
    pipes:[DateFormatPipe, FromUnixPipe]
})
export class EventListItemComponent implements OnChanges {
    event:Event;
    navController: NavController;
    currentLocation: Array<number>;
    location: Array<number>;

    ngOnChanges() {
      this.currentLocation = this.location;
    }

    constructor(navController: NavController){
      this.navController = navController;
    }
    viewEvent(event) {
      this.navController.push(EventPage, { event, location: this.currentLocation });
    }
}
