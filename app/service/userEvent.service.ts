import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {UserEvent} from '../models/user/userEvent';

import {HttpClient} from './http-client.service';


@Injectable()
export class UserEventService {

  userEvents: EventEmitter<UserEvent[]> = new EventEmitter();

  constructor(
    private _api: Http,
    private httpClient:HttpClient) {  };

  public getUserEvents(userId: number): void {
    this.httpClient.get(`users/${userId}/events`)
      .map(res => <UserEvent[]>res.json())
      .subscribe(
        err => console.log('error: ', err),
        () => console.log('User Events retrieval is completed')
      );
  }

  public createUserEvent(userId: number, userEvent: UserEvent): void {
    const userEventBody = JSON.stringify(userEvent);
    this.httpClient.post(`users/${userId}/events`, userEventBody)
      .subscribe(
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

  public updateUserEvent(userId: number, userEventId: number, userEvent: UserEvent): void {
    const userEventBody = JSON.stringify(userEvent);
    this.httpClient.put(`users/${userId}/events/${userEventId}`, userEventBody)
      .subscribe(
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

  public deleteUserEvent(userId: number, userEventId: number): void {
    this.httpClient.delete(`users/${userId}/events/${userEventId}`)
      .subscribe(
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }
}
