import {Component} from 'angular2/core';
import {Item, Label, TextArea} from 'ionic-angular';
import {Answer} from '../../models/survey/answer';

@Component({
  selector: 'textbox',
  templateUrl: 'build/components/textbox/textbox.component.html',
  directives: [Item, Label, TextArea],
})

export class TextboxComponent {
  answer: Answer;
}
