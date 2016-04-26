import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import MyMatrixApi from '../constants/apiConstants';
import {User} from '../models/user/user';
import {StorageService} from './storage.service';
import {HttpClient} from './http-client.service';

@Injectable()
export class UserService {
  user: EventEmitter<User> = new EventEmitter();
  error: EventEmitter<any> = new EventEmitter();

  constructor(private _api: Http, private httpClient:HttpClient, private _storageService:StorageService) { };

  public getUser(userId: number): void {
    const user = this.getUserFromLocalStorage();
    if (user) {
      this.emitUser(user);
    } else {
      this.httpClient.get(`users/${userId}`)
        .map(res => {return res.json()})
        .subscribe(
          user => this.emitUser(user),
          err => {
              console.log(err);
              this.error.emit(err.json());
            },
          () => console.log('User retrieval is completed')
        );
    }
  }

  public getUserFromLocalStorage():User{
    const user = JSON.parse(this._storageService.getItem('MyMatrixUser'));
    return user;
  }

  public getUserId():number{
    const user = JSON.parse(this._storageService.getItem('MyMatrixUser'));
    return user.id;
  }

  public emitUser(user:User):void {
    this.user.emit(user);
  }

  public isUserLoggedIn(){
    const user = JSON.parse(this._storageService.getItem('MyMatrixUser'));
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  public updateUser(userId: number, user: User): void {
    const userBody = JSON.stringify(user);
    this.httpClient.put(`users/${userId}`, userBody)
      .subscribe(
        err => {
            console.log(err);
            this.error.emit(err.json());
          },
        () => console.log('User updated')
      );
  }

  public deleteUser(userId: number): void {
    this.httpClient.delete(`users/${userId}`)
      .subscribe(
        err => {
            console.log(err);
            this.error.emit(err.json());
          },
        () => console.log('User updated')
      );
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
