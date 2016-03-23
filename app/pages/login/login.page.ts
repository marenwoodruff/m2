import {Page, NavController} from 'ionic-angular';
import {Inject} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/login/login.page.html',
})
export class LoginPage {
  nav: NavController;

  constructor(@Inject(NavController) nav) {
    this.nav = nav;
  }

}
