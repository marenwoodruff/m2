import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {MyMatrixApi} from '../constants/apiConstants';
import {User} from '../models/user/user';

@Injectable()
export class UserService {
  private _api: Http;
  user: EventEmitter<User> = new EventEmitter();

  constructor(private http: Http) {
    this._api = http;
  };

  public getUser(userId: number): void {
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

  public updateUser(userId: number, user: User): void {
    const userBody = JSON.stringify(user);
    this._api.put(`${MyMatrixApi}/users/${userId}`, userBody)
      .subscribe(
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

  public deleteUser(userId: number): void {
    this._api.delete(`${MyMatrixApi}/users/${userId}`)
      .subscribe(
        err => console.log('error: ', err),
        () => console.log('User updated')
      );
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
