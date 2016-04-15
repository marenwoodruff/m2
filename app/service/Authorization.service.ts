import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {MyMatrixApi} from '../constants/apiConstants';
import {User} from '../models/user/user';
import {UserLogin} from '../models/user/userLogin';
import {AuthorizedUser} from '../models/user/authorizedUser';

@Injectable()
export class AuthorizationService {
  private _api:Http;
  authorizedUser:EventEmitter<AuthorizedUser> = new EventEmitter();

  constructor(private http:Http) {
    this._api = http;
  };

  public authorizeUser(userLogin:UserLogin):void {
    const userLoginBody = JSON.stringify(userLogin);
    this._api.post(`${MyMatrixApi}/users/`, userLoginBody)
      .map(res => <AuthorizedUser>res.json())
      .subscribe(
        (authorizedUser) => {
          this.authorizedUser.emit(authorizedUser)
          this.setToken(authorizedUser.token)
        },
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

  public createAuthorizationHeader():Headers{
    let headers = new Headers();
    headers.append('Authorization', this.getToken());
    return headers;
  }

  public getToken():string {
    return localStorage.getItem('token');
  }

  public setToken(token:string):void {
    localStorage.setItem('token', token);
  }

  public removeToken():void {
    localStorage.removeItem('token');
  }

}
