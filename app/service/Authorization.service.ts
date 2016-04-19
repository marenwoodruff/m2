import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import MyMatrixApi from '../constants/apiConstants';
import {User} from '../models/user/user';
import {UserLogin} from '../models/user/userLogin';
import {AuthorizedUser} from '../models/user/authorizedUser';
import {UserService} from './user.service';
import {StorageService} from './storage.service';
import {HttpClient} from './http-client.service';

@Injectable()
export class AuthorizationService {
  authorizedUser: EventEmitter<AuthorizedUser> = new EventEmitter();

  constructor(private _api: Http, private httpClient:HttpClient, private _userService: UserService, private _storageService: StorageService) {
  };

  public authorizeUser(userLogin: UserLogin): void {
    const userLoginBody = JSON.stringify(userLogin);
    this.httpClient.post(`${MyMatrixApi}/users/`, userLoginBody)
      .map(res => <AuthorizedUser>res.json())
      .subscribe(
        (authorizedUser) => {
          const user = new User(authorizedUser);
          this._storageService.setItem('MyMatrixAuthToken', authorizedUser.token);
          this._storageService.setItem('MyMatrixUser', JSON.stringify(user));
          this._userService.emitUser(user);
        },
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

  public createAuthorizationHeader(): Headers {
    let headers = new Headers();
    headers.append('Authorization', this._storageService.getItem('MyMatrixAuthToken'));
    return headers;
  }

}
