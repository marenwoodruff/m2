import {Component} from 'angular2/core';
import {Item, Label, TextArea, Button} from 'ionic-angular';
import {Question} from '../../models/survey/question';

@Component({
  selector: 'textbox',
  templateUrl: 'build/components/textbox/textbox.component.html',
  directives: [Item, Label, TextArea, Button],
  inputs: ['question']
})

export class TextboxComponent {
  question: Question;

  getValue(answer: string) {
    // going to need this for saving survey
  }
}

