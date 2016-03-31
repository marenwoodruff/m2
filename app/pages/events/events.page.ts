import {Page} from 'ionic-angular';
import {OnInit, OnDestroy, forwardRef} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {EventsComponent} from '../../components/events/events.component';
import {SurveysComponent} from '../../components/surveys/surveys.component';
import {EventService} from "../../service/event.service";
import * as moment from 'moment';
import {Survey} from '../../models/survey/survey';
import {Event} from '../../models/events/event';

@Page({
    templateUrl: 'build/pages/events/events.page.html',
    directives: [EventsComponent, forwardRef(() => SurveysComponent), NgClass],
    providers:[EventService]
})
export class EventsPage implements OnInit, OnDestroy {
    private _eventsApi:EventService;
    public events:any;
    public upcomingEvents:Event[];
    page: string;
    userEvents:Event[] = [];
    userSurveys:Survey[] = [];

    constructor(eventService:EventService) {
      this._eventsApi = eventService;
    }

    ngOnInit():any {
      this._eventsApi.events.subscribe(
          events => {
            this.events = events
            this.getUpcomingEvents(events);
          },
          err => console.log("EventsComponent events subscribe error: ", err),
          () => console.log("Finished subscribing to events")
      );
      this._eventsApi.getEvents();
    }

    ngOnDestroy():any {
      this._eventsApi.events.unsubscribe();
    }

    getUpcomingEvents(events:Event[]) {
      this.upcomingEvents = events.filter((event) => {
        return moment.unix(event.startDate).isAfter();
      });
    }

    changePage(page:string) {
      this.page = (this.page === page) ? null : page;
    }

  }
  