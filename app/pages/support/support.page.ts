import {Page, Button} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/support/support.page.html',
  directives: [Button]
})
export class SupportPage {

  contactSupport() {
    window.plugin.email.isAvailable((available) => {
      if (available) {
        window.plugin.email.open({
          to: ['events@matrixres.com'],
          subject: 'MyMATRIX Mobile Help'
        });
      }
    });
  }

}