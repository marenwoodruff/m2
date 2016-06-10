import {Component, Inject} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignupEmailPage} from '../signupEmail/signupEmail.page';

@Component({
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
