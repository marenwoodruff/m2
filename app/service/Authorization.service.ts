import {Injectable, EventEmitter} from '@angular/core';
import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';
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
  error: EventEmitter<any> = new EventEmitter();
  createUserError: EventEmitter<any> = new EventEmitter();
  loginUserError: EventEmitter<any> = new EventEmitter();
  authorizeUserError: EventEmitter<any> = new EventEmitter();

  constructor(
      private _api: Http,
      private httpClient:HttpClient,
      private _userService: UserService,
      private _storageService: StorageService) {};

  public authorizeUser(authorizeUser: AuthorizeUser): void {
    const userLoginBody = JSON.stringify(authorizeUser);
    this.httpClient.post(`users/authorize`, userLoginBody)
      .map(res => {return res.json()})
      .subscribe(
        (authorizedUser) => {
          this.emitAuthorizedUser(authorizedUser);
        },
        err => this.authorizeUserError.emit(err.json()),
        () => console.log('User updated')
      );
  }

  public emitAuthorizedUser(authorizedUser:AuthorizedUser): void{
    const user = new User(authorizedUser);
    this._storageService.setItem('MyMatrixAuthToken', authorizedUser.token);
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
        err => this.createUserError.emit(err.json()),
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
        err => this.loginUserError.emit(err.json()),
        () => console.log('User updated')
      );
  }

  public logOut():void {
    this._storageService.removeItem('MyMatrixAuthToken');
    this._storageService.removeItem('MyMatrixUser');
  }

}
