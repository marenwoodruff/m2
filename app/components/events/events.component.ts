/**
 * Created by Abbey on 3/10/2016.
 */
import {Component,OnInit,OnDestroy, Input} from 'angular2/core';
import {List, Button} from 'ionic-angular';
import {EventListItemComponent} from "./eventListItem.component";
import {EventService} from "../../service/event.service";

@Component({
    selector: 'events',
    templateUrl: 'build/components/events/events.component.html',
    directives: [List, EventListItemComponent, Button],
    inputs:['events']
})

export class EventsComponent {}
