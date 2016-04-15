import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {MyMatrixApi} from '../constants/apiConstants';
import {UserSurvey} from '../models/user/userSurvey';
import {AuthorizationService} from './authorization.service';

@Injectable()
export class UserEventService {
  private _api: Http;
  userSurveys: EventEmitter<UserSurvey[]> = new EventEmitter();

  constructor(private http: Http, private _authorizationService:AuthorizationService) {
    this._api = http;
  };

  public getUserSurveys(userId: number): void {
    this._api.get(`${MyMatrixApi}/users/${userId}/surveys`, { headers: this._authorizationService.createAuthorizationHeader() })
      .map(res => <UserSurvey[]>res.json())
      .subscribe(
        userSurvey => this.userSurveys.emit(userSurvey),
        err => console.log('error: ', err),
        () => console.log('User Surveys retrieval is completed')
      );
  }

  public createUserSurvey(userId: number, userSurvey: UserSurvey): void {
    const userSurveyBody = JSON.stringify(userSurvey);
    this._api.post(`${MyMatrixApi}/users/${userId}/surveys`, userSurveyBody, { headers: this._authorizationService.createAuthorizationHeader() })
      .subscribe(
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }
}
