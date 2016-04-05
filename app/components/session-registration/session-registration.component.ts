import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {Button, List, Item, TextInput, Label} from 'ionic-angular';

@Component({
  selector: 'session-registration',
  templateUrl: 'build/components/session-registration/session-registration.component.html',
  directives: [Button, List, Item, TextInput, Label]
})

export class SessionRegistrationPage { }
