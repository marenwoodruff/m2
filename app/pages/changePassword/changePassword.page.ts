import {Component} from '@angular/core';
import {Nav} from 'ionic-angular';
import {ChangePasswordComponent} from '../../components/changePassword/changePassword.component';

@Component({
  templateUrl: 'build/pages/changePassword/changePassword.page.html',
  directives: [ChangePasswordComponent]
})

export class ChangePasswordPage {

  constructor(private nav:Nav) {
    this.nav.swipeBackEnabled = false;
  }
}
