import {Page, Icon, NavController, ActionSheet} from 'ionic-angular';
import {OnInit, OnDestroy, forwardRef} from 'angular2/core';
import {EventsComponent} from '../../components/events/events.component';
import {SurveysComponent} from '../../components/surveys/surveys.component';
import {EventService} from "../../service/event.service";
import * as moment from 'moment';
import {Survey} from '../../models/survey/survey';
import {Event} from '../../models/events/event';

@Page({
    templateUrl: 'build/pages/events/events.page.html',
    directives: [EventsComponent, forwardRef(() => SurveysComponent), Icon],
    providers:[EventService]
})
export class EventsPage implements OnInit, OnDestroy {
    private _eventsApi:EventService;
    public events:any;
    public upcomingEvents:Event[];
    public pastEvents:Event[];
    public localEvents: Event[];
    page: string;
    surveys: Survey[] = [];
    public currentLocation: Array<number>;
    public filteredLocation: Event[];

    constructor(eventService:EventService, public nav:NavController) {
      this._eventsApi = eventService;
    }

    ngOnInit():any {
      this.getCurrentLocation();

      this._eventsApi.events.subscribe(
          events => {
            this.events = events
            this.getUpcomingEvents(events);
            this.getPastEvents(events);
          },
          err => console.log("EventsComponent events subscribe error: ", err),
          () => console.log("Finished subscribing to events")
      );

      this._eventsApi.getEvents();
    }

    ngOnDestroy():any {
      this._eventsApi.events.unsubscribe();
    }

    filterLocations() {
      let filterSheet = ActionSheet.create({
        title: 'Filter Events by Location',
        buttons: [
          {
            text: 'All Events',
            handler: () => {
              this.filteredLocation = this.events;
            }
          },
          {
            text: 'Events Near Me',
            handler: () => {
              this.filteredLocation = this.localEvents;
              console.log(this.filteredLocation);
            }
          }
        ]
      });

      this.nav.present(filterSheet);
    }

    getUpcomingEvents(events:Event[]) {
      this.upcomingEvents = events.filter((event) => {
        return moment.unix(event.startDate).isAfter();
      });
    }

    getPastEvents(events:Event[]) {
      this.pastEvents = events.filter((event) => {
        return moment.unix(event.startDate).isBefore();
      });
    }

    getLocalEvents(events:Event[]) {
      this.localEvents = events.filter((event) => {
        let eventCoordinates = event.mapCoordinates.split(',').splice(0, 2);
        let latDistance = Math.abs(eventCoordinates[0] - this.currentLocation[0]);
        let longDistance = Math.abs(eventCoordinates[1] - this.currentLocation[1]);
        if ((latDistance <= 1.445674) && (longDistance <= 1.445674)) {
          return true;
        }
      });
      this.filteredLocation = this.localEvents;
    }

    changePage(page:string) {
      this.page = (this.page === page) ? null : page;
    }

    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => { 
          this.currentLocation = [position.coords.latitude, position.coords.longitude];
          this.getLocalEvents(this.events);
        },
        (error) => {
          alert(error.message);
          console.log('getting location error:', error);
        }
      );
    }

  }
