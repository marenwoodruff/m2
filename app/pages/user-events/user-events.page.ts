import {Page} from 'ionic-angular';
import {OnInit, OnDestroy, EventEmitter} from 'angular2/core';

import {UserEvent} from '../../models/user/userEvent';

import {EventsComponent} from '../../components/events/events.component';

import {UserEventService} from '../../service/userEvent.service';
import {UserService} from '../../service/user.service';

@Page({
  templateUrl: 'build/pages/user-events/user-events.page.html',
  directives: [EventsComponent]
})

export class UserEventsPage implements OnInit, OnDestroy {

  eventSubscription: EventEmitter<UserEvent[]>;
  userEvents: UserEvent[];
  userId: number;
  location: Array<number>;

  constructor(private _userEventApi:UserEventService, private _userApi:UserService) {}
  
  public ngOnInit(): void {
    this.getUserId();

    this.eventSubscription = this._userEventApi.userEvents.subscribe(
      userEvents => this.userEvents = userEvents,
      err => console.log('user event error', err),
      () => console.log('finished subscribing to user events')
    );

    this._userEventApi.getUserEvents(this.userId);
  }

  public ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  private getUserId(): void {
    this.userId = this._userApi.getUserId();
  }
}