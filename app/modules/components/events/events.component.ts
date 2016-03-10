/**
 * Created by Abbey on 3/10/2016.
 */
import {Component,OnInit,OnDestroy} from 'angular2/core';
import {EventComponent} from "./event.component";
import {EventService} from "../../../service/event.service";

@Component({
    selector: 'events',
    templateUrl: 'build/modules/components/events/events.component.html',
    directives: [EventComponent],
    providers:[EventService]
})

export class EventsComponent implements OnInit, OnDestroy {

    private _eventsApi:EventService;
    public events:Event[];

    constructor(eventService:EventService) {
        this._eventsApi = eventService;
    }

    ngOnInit():any {
        this._eventsApi.events.subscribe(
            events =>this.events = events,
            err => console.log("EventsComponent events subscribe error: ", err),
            () => console.log("Finished subscribing to events")
        );
        this._eventsApi.getEvents();
    }

    ngOnDestroy():any {
        this._eventsApi.events.unsubscribe();
    }

}