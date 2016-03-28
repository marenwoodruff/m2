import {Page, NavController} from 'ionic-angular';
import {LoginComponent} from '../../components/login/login.component';
import {Inject} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/login/login.page.html',
  directives: [LoginComponent]
})
export class LoginPage {
  nav: NavController;

  constructor(@Inject(NavController) nav) {
    this.nav = nav;
  }

}
