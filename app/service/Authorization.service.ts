import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import MyMatrixApi from '../constants/apiConstants';
import {User} from '../models/user/user';
import {AuthorizeUser} from '../models/user/authorizeUser';
import {AuthorizedUser} from '../models/user/authorizedUser';
import {UserLogin} from '../models/user/userLogin';
import {UserService} from './user.service';
import {StorageService} from './storage.service';
import {HttpClient} from './http-client.service';

@Injectable()
export class AuthorizationService {
  authorizedUser: EventEmitter<AuthorizedUser> = new EventEmitter();

  constructor(private _api: Http, private httpClient:HttpClient, private _userService: UserService, private _storageService: StorageService) {
  };

  public authorizeUser(authorizeUser: AuthorizeUser): void {
    const userLoginBody = JSON.stringify(authorizeUser);
    this.httpClient.post(`users/authorize`, userLoginBody)
      .map(res => {return res.json()})
      .subscribe(
        (authorizedUser) => {
          this.emitAuthorizedUser(authorizedUser);
        },
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

  public emitAuthorizedUser(authorizedUser:AuthorizedUser): void{
    const user = new User(authorizedUser);
    this._storageService.setItem('MyMatrixAuthToken', authorizedUser.token);
    this._storageService.setItem('MyMatrixUser', JSON.stringify(user));
    this._userService.emitUser(user);
  }

  public createUser(user: User): void {
    const userLoginBody = JSON.stringify(user);
    this.httpClient.post(`users`, userLoginBody)
      .map(res => {return res.json()})
      .subscribe(
        (authorizedUser) => {
          this.emitAuthorizedUser(authorizedUser);
        },
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

  public loginUserWithEmail(userLogin: UserLogin): void {
    const userLoginBody = JSON.stringify(userLogin);
    this.httpClient.post(`users/login`, userLoginBody)
      .map(res => {return res.json()})
      .subscribe(
        (authorizedUser) => {
          this.emitAuthorizedUser(authorizedUser);
        },
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

}
