import {Page, Button} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/support/support.page.html',
  directives: [Button]
})
export class SupportPage {

  contactSupport() {
    cordova.plugins.email.isAvailable((isAvailable) => {
      if (isAvailable) {
        cordova.plugins.email.open({
          to: 'events@matrixres.com',
          subject: 'MyMATRIX Mobile Help'
        });
      }
    });
  }

}