/**
 * Created by Abbey on 3/10/2016.
 */
import {Page} from 'ionic-angular';
import {EventsComponent} from '../../components/events/events.component';
import {EventService} from "../../service/event.service";


@Page({
    templateUrl: 'build/pages/events/events.page.html',
    directives: [EventsComponent],
    providers:[EventService],
})
export class EventsPage {
    private _eventsApi:EventService;
    public events:Event[];
    page: string;

    constructor(eventService:EventService) {
        this._eventsApi = eventService;
    }

    ngOnInit():any {
        this._eventsApi.events.subscribe(
            events => this.events = events,
            err => console.log("EventsComponent events subscribe error: ", err),
            () => console.log("Finished subscribing to events")
        );
        this._eventsApi.getEvents();
    }

    ngOnDestroy():any {
        this._eventsApi.events.unsubscribe();
    }

    filterEvents(p:string) {
      this.page = p;
      console.log(this.page);
    }
  }
