import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {Button, List, Item, TextInput, Label} from 'ionic-angular';

@Component({
  selector: 'signup',
  templateUrl: 'build/components/signup/signup.component.html',
  directives: [Button, List, Item, TextInput, Label]
})

export class SignupComponent {}
