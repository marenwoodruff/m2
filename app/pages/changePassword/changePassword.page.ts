import {Page, Nav} from 'ionic-angular';
import {ChangePasswordComponent} from '../../components/changePassword/changePassword.component';

@Page({
  templateUrl: 'build/pages/changePassword/changePassword.page.html',
  directives: [ChangePasswordComponent]
})

export class ChangePasswordPage {

  constructor(private nav:Nav) {
    this.nav.swipeBackEnabled = false;
  }
}
