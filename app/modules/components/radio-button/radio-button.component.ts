import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {Item, Label, RadioButton} from 'ionic-angular';
import {Answer} from '../../survey/answer';
import {Response} from '../../survey/response';
import {Option} from '../../survey/option';
import {Selection} from '../../survey/selection';

@Component({
  selector: 'radio-button',
  templateUrl: 'build/modules/components/radio-button/radio-button.component.html',
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

