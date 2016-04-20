import {Component, Input, AfterContentInit} from 'angular2/core';
import {Button, List, Item, TextInput, Label} from 'ionic-angular';

@Component({
  selector: 'session-registration',
  templateUrl: 'build/components/session-registration/session-registration.component.html',
  directives: [Button, List, Item, TextInput, Label],
  inputs: ['event']
})

export class SessionRegistrationPage implements AfterContentInit { 

  ngAfterContentInit() {
    MktoForms2.loadForm("//app-abm.marketo.com", "695-WVM-122", 1862);
  }

  saveEvent() {
    let event = document.getElementById('Seminar').value.split(' ').slice(2,6).join(' ');
    console.log(event);
  }

}
