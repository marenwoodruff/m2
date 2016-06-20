import {EventEmitter, OnInit} from '@angular/core';
import {Page, Button} from 'ionic-angular';
import {User} from '../../models/user/user';
import {UserService} from '../../service/user.service';

@Page({
  templateUrl: 'build/pages/support/support.page.html',
  directives: [Button]
})

export class SupportPage {
  private user: User;
  public userEventEmitter: EventEmitter;

  constructor(private _userApi: UserService) {
    this.userEventEmitter = this._userApi.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    })
  }

  ngOnInit() {
    this._userApi.getUser();
  }

  contactSupport() {
    cordova.plugins.email.isAvailable((isAvailable) => {
      if (isAvailable) {
        cordova.plugins.email.open({
          to: 'events@matrixres.com',
          subject: 'MyMATRIX Mobile Help',
          body: 'from: ' + this.user.name
        });
      }
    });
  }

}
