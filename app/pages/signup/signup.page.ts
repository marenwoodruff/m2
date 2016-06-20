import {Component, Inject} from '@angular/core';
import {Nav} from 'ionic-angular';
import {SignupEmailPage} from '../signupEmail/signupEmail.page';

@Component({
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
