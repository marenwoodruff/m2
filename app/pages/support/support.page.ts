import {Page, Button} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/support/support.page.html',
  directives: [Button]
})
export class SupportPage {

  contactSupport() {
    window.plugins.email.isAvailable((available) => {
      if (available) {
        window.plugins.email.open({
          to: ['events@matrixres.com'],
          subject: 'MyMATRIX Mobile Help'
        });
      }
    });
  }

}