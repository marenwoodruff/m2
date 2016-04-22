import {Page, Icon, NavController, ActionSheet} from 'ionic-angular';
import {OnInit, OnDestroy, forwardRef, EventEmitter} from 'angular2/core';
import {EventsComponent} from '../../components/events/events.component';
import {SurveysComponent} from '../../components/surveys/surveys.component';
import {EventService} from "../../service/event.service";
import * as moment from 'moment';
import {Survey} from '../../models/survey/survey';
import {Event} from '../../models/events/event';
import {LoaderComponent} from '../../components/loader/loader.component';

@Page({
    templateUrl: 'build/pages/events/events.page.html',
    directives: [EventsComponent, forwardRef(() => SurveysComponent), Icon, LoaderComponent]
})
export class EventsPage implements OnInit, OnDestroy {
    public events:any;
    public upcomingEvents:Event[];
    public pastEvents:Event[];
    public localEvents: Event[];
    page: string;
    surveys: Survey[] = [];
    public currentLocation: Array<number>;
    public filteredLocation: Event[];
    private eventSubscription: EventEmitter<Event[]>;
    private isLoading:boolean = true;

    constructor(private _eventsApi:EventService, public nav:NavController) { }

    ngOnInit():any {
      this.getCurrentLocation();

      this.eventSubscription = this._eventsApi.events.subscribe(
          events => {
            this.events = events;
          },
          err => console.log("EventsComponent events subscribe error: ", err),
          () => console.log("Finished subscribing to events")
      );

      this._eventsApi.getEvents();
    }

    ngOnDestroy():any {
      this.eventSubscription.unsubscribe();
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
      if (events) {
        this.localEvents = events.filter((event) => {
          let eventCoordinates = event.mapCoordinates.split(',').splice(0, 2);
          let latDistance = Math.abs(eventCoordinates[0] - this.currentLocation[0]);
          let longDistance = Math.abs(eventCoordinates[1] - this.currentLocation[1]);
          if ((latDistance <= 1.445674) && (longDistance <= 1.445674)) {
            return true;
          }
        });
        this.filteredLocation = this.localEvents;
        this.isLoading = false;
      }
    }

    changePage(page:string) {
      this.page = (this.page === page) ? null : page;
    }

    getCurrentLocation() {
      this.isLoading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = [position.coords.latitude, position.coords.longitude];
          this.getLocalEvents(this.events);
        },
        (error) => {
          console.log('getting location error:', error);
        }
      );
    }

  }
