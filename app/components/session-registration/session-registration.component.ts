import {Component, Input, AfterContentInit} from 'angular2/core';
import {Button, List, Item, TextInput, Label} from 'ionic-angular';
// import '../../modules/marketo';
@Component({
  selector: 'session-registration',
  templateUrl: 'build/components/session-registration/session-registration.component.html',
  directives: [Button, List, Item, TextInput, Label],
  inputs: ['event']
})

export class SessionRegistrationPage implements AfterContentInit {

  ngAfterContentInit() {
    MktoForms2.loadForm("http://app-abm.marketo.com", "695-WVM-122", 1862);
  }

}
