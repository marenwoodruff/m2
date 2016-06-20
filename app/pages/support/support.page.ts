import {Component} from '@angular/core';
import {Button} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/support/support.page.html',
  directives: [Button]
})

export class SupportPage {
  contactSupport() {
    cordova.plugins.email.isAvailable((available) => {
      if (available) {
        cordova.plugins.email.open({
          to: 'events@matrixres.com',
          subject: 'MyMATRIX Mobile Help'
        });
      } 
    });
  }
}
