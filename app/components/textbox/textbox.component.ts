import {Component} from 'angular2/core';
import {Item, Label, TextArea} from 'ionic-angular';
import {Question} from '../../models/survey/question';

@Component({
  selector: 'textbox',
  templateUrl: 'build/components/textbox/textbox.component.html',
  directives: [Item, Label, TextArea],
  inputs: ['question']
})

export class TextboxComponent {
  question: Question;


  getValue(id: any, val: string) {
    id.value = val;
    console.log(id, val);
  }
}

