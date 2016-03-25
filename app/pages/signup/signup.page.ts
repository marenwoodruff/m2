import {Page, NavController} from 'ionic-angular';
import {Inject} from 'angular2/core';
import {SignupEmailPage} from '../signupEmail/signUpEmail.page';

@Page({
  templateUrl: 'build/pages/signup/signup.page.html'
})
export class SignupPage {
  nav: NavController;

  constructor(@Inject(NavController) nav) {
    this.nav = nav;
  }

  signUpWithEmail() {
    this.nav.push(SignupEmailPage);
  }

}
