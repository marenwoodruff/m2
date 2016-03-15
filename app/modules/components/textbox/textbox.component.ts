import {Component} from 'angular2/core';
import {Item, Label, TextArea} from 'ionic-angular';
import {Answer} from '../../survey/answer';

@Component({
  selector: 'textbox',
  templateUrl: 'build/modules/components/textbox/textbox.component.html',
  directives: [Item, Label, TextArea],
})

export class TextboxComponent {
  answer: Answer;
}