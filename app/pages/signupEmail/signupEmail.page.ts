import {Page, NavController} from 'ionic-angular';
import {Inject} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/signupEmail/signupEmail.page.html'
})
export class SignupEmailPage {
  nav: NavController;

  constructor(@Inject(NavController) nav) {
    this.nav = nav;
  }

}
