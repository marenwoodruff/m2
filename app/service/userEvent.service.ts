import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import MyMatrixApi from '../constants/apiConstants';
import {UserEvent} from '../models/user/userEvent';
import {AuthorizationService} from './authorization.service';

@Injectable()
export class UserEventService {

  userEvents: EventEmitter<UserEvent[]> = new EventEmitter();

  constructor(private _api: Http, private _authorizationService:AuthorizationService) {  };

  public getUserEvents(userId: number): void {
    this._api.get(`${MyMatrixApi}/users/${userId}/events`, { headers: this._authorizationService.createAuthorizationHeader() })
      .map(res => <UserEvent[]>res.json())
      .subscribe(
        userEvents => this.userEvents.emit(userEvents),
        err => console.log('error: ', err),
        () => console.log('User Events retrieval is completed')
      );
  }

  public createUserEvent(userId: number, userEvent: UserEvent): void {
    const userEventBody = JSON.stringify(userEvent);
    this._api.post(`${MyMatrixApi}/users/${userId}/events`, userEventBody, { headers: this._authorizationService.createAuthorizationHeader() })
      .subscribe(
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

  public updateUserEvent(userId: number, userEventId: number, userEvent: UserEvent): void {
    const userEventBody = JSON.stringify(userEvent);
    this._api.put(`${MyMatrixApi}/users/${userId}/events/${userEventId}`, userEventBody, { headers: this._authorizationService.createAuthorizationHeader() })
      .subscribe(
        () => this.getUserEvents(userId),
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

  public deleteUserEvent(userId: number, userEventId: number): void {
    this._api.delete(`${MyMatrixApi}/users/${userId}/events/${userEventId}`, { headers: this._authorizationService.createAuthorizationHeader() })
      .subscribe(
        () => this.getUserEvents(userId),
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }
}
