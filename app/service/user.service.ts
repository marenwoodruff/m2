import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import MyMatrixApi from '../constants/apiConstants';
import {User} from '../models/user/user';
import {UserPasswordChange} from '../models/user/userPasswordChange';
import {StorageService} from './storage.service';
import {HttpClient} from './http-client.service';

@Injectable()
export class UserService {
  user: EventEmitter<User> = new EventEmitter();
  error: EventEmitter<any> = new EventEmitter();
  getUserError: EventEmitter<any> = new EventEmitter();
  updateUserError: EventEmitter<any> = new EventEmitter();
  deleteUserError: EventEmitter<any> = new EventEmitter();
  changePasswordError: EventEmitter<any> = new EventEmitter();
  userDeleted: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private _api: Http,
    private httpClient:HttpClient,
    private _storageService:StorageService) { };

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
              this.getUserError.emit(err.json());
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
    this._storageService.setItem('MyMatrixUser', JSON.stringify(user));
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
        () => {
          this.emitUser(user);
        },
        err => {
            console.log(err);
            this.updateUserError.emit(err.json());
          },
        () => console.log('User updated')
      );
  }

  public changePassword(userId: number, userPasswordChange: UserPasswordChange): void {
    const body = JSON.stringify(userPasswordChange);
    this.httpClient.put(`users/${userId}/changePassword`, body)
      .subscribe(
        () => {
          const user = this.getUserFromLocalStorage();
          this.user.emit(user);
        },
        err => {
            console.log(err);
            this.changePasswordError.emit(err.json());
          },
        () => console.log('Password updated')
      );
  }

  public deleteUser(userId: number): void {
    this.httpClient.delete(`users/${userId}`)
      .subscribe(
        () => {
          this.userDeleted.emit(true);
        },
        err => {
            console.log(err);
            this.deleteUserError.emit(err.json());
          },
        () => console.log('User deleted')
      );
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
