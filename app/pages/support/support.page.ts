import {Page, Button} from 'ionic-angular';
import {User} from '../../models/user/user';
import {UserService} from '../../service/user.service';

@Page({
  templateUrl: 'build/pages/support/support.page.html',
  directives: [Button]
})
export class SupportPage {
  private user: User;

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