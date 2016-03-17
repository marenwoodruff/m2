import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {Item, Label, RadioButton} from 'ionic-angular';
import {Answer} from '../../models/survey/answer';
import {Response} from '../../models/survey/response';
import {Option} from '../../models/survey/option';
import {Selection} from '../../models/survey/selection';

@Component({
  selector: 'radio-button',
  templateUrl: 'build/components/radio-button/radio-button.component.html',
  directives: [FORM_DIRECTIVES, Item, Label, RadioButton],
  inputs: ['answer'],
})

export class RadioButtonComponent {
  answer: Answer;
  response: Response;
  selection: Selection[];

  getValue(id: number, res: any) {
    if (res.selected) {
      res.selected = false
    } else {
      res.selected = true;
    }

    // let selection = new Selection(res.value, res.display);
    // let response = new Response(id, [selection]);
    // return response;
    // res.selected = true;
    console.log(res);
  }
}
