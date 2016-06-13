import {Page, Nav} from 'ionic-angular';
import {Inject} from '@angular/core';
import {SignupEmailPage} from '../signupEmail/signupEmail.page';

@Page({
  templateUrl: 'build/pages/signup/signup.page.html'
})
export class SignupPage {
  nav: Nav;

  constructor(@Inject(Nav) nav) {
    this.nav = nav;
  }

  signUpWithEmail() {
    this.nav.push(SignupEmailPage);
  }

}
