import {Page} from 'ionic-angular';
import {OnInit, OnDestroy, EventEmitter} from 'angular2/core';
import * as moment from 'moment';

import {UserEvent} from '../../models/user/userEvent';
import {Event} from '../../models/Events/event';

import {EventsComponent} from '../../components/events/events.component';
import {LoaderComponent} from '../../components/loader/loader.component';

import {UserEventService} from '../../service/userEvent.service';
import {UserService} from '../../service/user.service';
import {EventService} from '../../service/event.service';

@Page({
  templateUrl: 'build/pages/user-events/user-events.page.html',
  directives: [EventsComponent, LoaderComponent]
})

export class UserEventsPage implements OnInit, OnDestroy {

  userEventSubscription: EventEmitter<UserEvent[]>;
  eventSubscription: EventEmitter<Event[]>;
  userEvents: UserEvent[];
  events: Event[];
  userId: number;
  location: Array<number>;
  private isLoading: boolean = true;

  constructor(private _userEventApi:UserEventService, private _userApi:UserService, private _eventApi:EventService) {}
  
  public ngOnInit(): void {
    this.getUserId();

    this.userEventSubscription = this._userEventApi.userEvents.subscribe(
      userEvents => {
        this.userEvents = userEvents;
        this.hideOldEvents(userEvents);
        this._eventApi.getUserEvents(this.userEvents);
      },
      err => console.log('user event error', err),
      () => console.log('finished subscribing to user events')
    );

    this.eventSubscription = this._eventApi.events.subscribe(
      events => this.events = events,
      err => console.log('events error: ', err),
      () => console.log('finished subscribing to events')
    );

    this._userEventApi.getUserEvents(this.userId);
  }

  public ngOnDestroy(): void {
    this.userEventSubscription.unsubscribe();
    this.eventSubscription.unsubscribe();
  }

  private getUserId(): void {
    this.userId = this._userApi.getUserId();
  }

  private hideOldEvents(userEvents:UserEvent[]) {
    this.userEvents = userEvents.filter((event) => {
      return moment.unix(event.startDate).isAfter();
    });
    this.isLoading = false;
  }
}