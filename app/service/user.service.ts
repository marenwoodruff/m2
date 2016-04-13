import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {MyMatrixApi} from '../constants/apiConstants';
import {User} from '../models/user/user';
import {UserEvent} from '../models/user/userEvent';
import {UserSurvey} from '../models/user/userSurvey';


@Injectable()
export class UserService {
    private _api:Http;
    user:EventEmitter<User> = new EventEmitter();
    userSurveys:EventEmitter<UserSurvey[]> = new EventEmitter();
    userEvents:EventEmitter<UserEvent[]> = new EventEmitter();

    constructor(private http:Http) {
      this._api = http;
    };

    public getUser(userId:number):void {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        this._api.get(`${MyMatrixApi}/users/${userId}`)
          .map(res => <User>res.json())
          .subscribe(
          user => this.user.emit(user),
          err => console.log(err),
          () => console.log('User retrieval is completed')
        );
      } else {
        this.user.emit(user);
      }

    }

    public getUserEvents(userId:number):void {
      this._api.get(`${MyMatrixApi}/users/${userId}/events`)
        .map(res => <UserEvent[]>res.json())
        .subscribe(
          userEvents => this.userEvents.emit(userEvents),
          err => console.log('error: ', err),
          () => console.log('User Events retrieval is completed')
        );
    }

    public getUserSurveys(userId:number):void {
      this._api.get(`${MyMatrixApi}/users/${userId}/surveys`)
        .map(res => <UserSurvey[]>res.json())
        .subscribe(
          userSurvey => this.userSurveys.emit(userSurvey),
          err => console.log('error: ', err),
          () => console.log('User Surveys retrieval is completed')
        );
    }

    public createUserEvent(userId:number, userEvent:UserEvent):void {
      const userEventBody = JSON.stringify(userEvent);
      this._api.post(`${MyMatrixApi}/users/${userId}/events`, userEventBody)
        .subscribe(
          err => console.log('error: ', err),
          () => console.log('User updated')
        );
    }

    public createUserSurvey(userId:number, userSurvey:UserSurvey):void {
      const userSurveyBody = JSON.stringify(userSurvey);
      this._api.post(`${MyMatrixApi}/users/${userId}/surveys`, userSurveyBody)
        .subscribe(
          err => console.log('error: ', err),
          () => console.log('User updated')
        );
    }

    public updateUser(userId:number, user:User):void {
      const userBody = JSON.stringify(user);
      this._api.put(`${MyMatrixApi}/users/${userId}`, userBody)
        .subscribe(
          err => console.log('error: ', err),
          () => console.log('User updated')
        );
    }

    public updateUserEvent(userId:number, userEventId:number, userEvent:UserEvent):void {
      const userEventBody = JSON.stringify(userEvent);
      this._api.put(`${MyMatrixApi}/users/${userId}/events/${userEventId}`, userEventBody)
        .subscribe(
          () => this.getUserEvents(userId),
          err => console.log('error: ', err),
          () => console.log('User updated')
        );
    }

    public deleteUserEvent(userId:number, userEventId:number):void {
      this._api.delete(`${MyMatrixApi}/users/${userId}/events/${userEventId}`)
        .subscribe(
          () => this.getUserEvents(userId),
          err => console.log('error: ', err),
          () => console.log('User updated')
        );
    }

    public deleteUser(userId:number):void {
      this._api.delete(`${MyMatrixApi}/users/${userId}`)
        .subscribe(
          err => console.log('error: ', err),
          () => console.log('User updated')
        );
    }

    public setUser(user:User):void{
      localStorage.setItem('user', JSON.stringify(user));
    }
}
