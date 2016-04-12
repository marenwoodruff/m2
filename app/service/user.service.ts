import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {User} from '../models/user/user';
import {UserEvent} from '../models/user/userEvent';
import {UserSurvey} from '../models/user/userSurvey';


@Injectable()
export class UserService {
    private _api:Http;
    userSurveys:EventEmitter<UserSurvey[]> = new EventEmitter();
    userEvents:EventEmitter<UserEvent[]> = new EventEmitter();

    constructor(private http:Http) {
      this._api = http;
    };

    public getUserEvents():void {

    }

    public getUserSurveys():void {

    }

    public updateUser():void {

    }

    public updateUserEvent():void {

    }

    public deleteUserEven():void {

    }

    public deleteUser():void {

    }
}
