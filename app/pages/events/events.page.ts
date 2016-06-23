import {Component, OnInit, OnDestroy, forwardRef, EventEmitter} from '@angular/core';
import {Icon, Nav, ActionSheet, MenuController} from 'ionic-angular';
import {EventsComponent} from '../../components/events/events.component';
import {SurveysComponent} from '../../components/surveys/surveys.component';
import {EventService} from "../../service/event.service";
import * as moment from 'moment';
import {Survey} from '../../models/survey/survey';
import {Event} from '../../models/events/event';
import {LoaderComponent} from '../../components/loader/loader.component';
import {UserService} from '../../service/user.service';
import {LoginPage} from '../login/login.page';

@Component({
    templateUrl: 'build/pages/events/events.page.html',
    directives: [EventsComponent, forwardRef(() => SurveysComponent), Icon, LoaderComponent]
})

export class EventsPage implements OnInit, OnDestroy {
  public events:any;
  public upcomingEvents:Event[];
  public pastEvents:Event[];
  public localEvents: Event[];
  public page: string;
  public surveys: Survey[] = [];
  public currentLocation: Array<number>;
  public filteredLocation: Event[];
  private eventSubscription: EventEmitter<Event[]>;
  private isLoading:boolean = true;
  private loggedIn: boolean;

  constructor(
    private _eventsApi:EventService,
    private _menuController: MenuController,
    public nav:Nav,
    private _userApi:UserService) { }

    public ngOnInit():any {
      this.isLoading = true;
      this._menuController.enable(true);
      this._menuController.swipeEnable(true);
      this.eventSubscription = this._eventsApi.events.subscribe(
          events => {
            this.events = events;
            this.filteredLocation = this.events;
            this.isLoading = false;
          },
          err => console.log("EventsComponent events subscribe error: ", err),
          () => console.log("Finished subscribing to events")
      );

    this._eventsApi.getEvents();
    this.getCurrentLocation();
  }

  public ngOnDestroy():any {
    this.eventSubscription.unsubscribe();
  }

  private filterLocations() {
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
            this.getCurrentLocation();
            this.filteredLocation = this.localEvents ? this.localEvents : this.events;
          }
        }
      ]
    });

    this.nav.present(filterSheet);
  }

  private getUpcomingEvents(events:Event[]) {
    this.upcomingEvents = events.filter((event) => {
      return moment.unix(event.startDate).isAfter();
    });
  }

  private getPastEvents(events:Event[]) {
    this.pastEvents = events.filter((event) => {
      return moment.unix(event.startDate).isBefore();
    });
  }

  private getLocalEvents(events:Event[]) {
    if (this.currentLocation && events) {
      this.localEvents = events.filter((event) => {
        let eventCoordinates:any[] = event.mapCoordinates.split(',').splice(0, 2);
        let latDistance = Math.abs(eventCoordinates[0] - this.currentLocation[0]);
        let longDistance = Math.abs(eventCoordinates[1] - this.currentLocation[1]);
        if ((latDistance <= 1.445674) && (longDistance <= 1.445674)) {
          return true;
        }
      });
    } 
    this.isLoading = false;
  }

  private changePage(page:string) {
    this.page = (this.page === page) ? null : page;
  }

  private getCurrentLocation() {
    this.isLoading = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.currentLocation = [position.coords.latitude, position.coords.longitude];
        this.getLocalEvents(this.events);
      },
      (error) => {
        console.log('getting location error:', error);
        this.filteredLocation = this.events;
        this.isLoading = false;
      }
    );
  }
}
