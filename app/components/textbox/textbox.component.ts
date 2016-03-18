import {Component} from 'angular2/core';
import {Item, Label, TextArea} from 'ionic-angular';
import {Answer} from '../../models/survey/answer';
import {Response} from '../../models/survey/response';
import {Selection} from '../../models/survey/selection';

@Component({
  selector: 'textbox',
  templateUrl: 'build/components/textbox/textbox.component.html',
  directives: [Item, Label, TextArea],
  inputs: ['answer']
})

export class TextboxComponent {
  answer: Answer;
  response: Response;
  selection: Selection;

  getValue(id: any, val: string) {
    let selection = new Selection(val);
    let response = new Response(id, [selection]);
    id.value = val;
    console.log(id, val);
  }
}
