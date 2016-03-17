import {Component} from 'angular2/core';
import {Item, Label, Checkbox} from 'ionic-angular';
import {Answer} from '../../models/survey/answer';

@Component({
  selector: 'checkbox',
  templateUrl: 'build/components/checkbox/checkbox.component.html',
  directives: [Item, Label, Checkbox],
  inputs: ['answer']
})

export class CheckboxComponent {
  answer: Answer;
}
