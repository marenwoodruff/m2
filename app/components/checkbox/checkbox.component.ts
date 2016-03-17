import {Component} from 'angular2/core';
import {Item, Label, Checkbox} from 'ionic-angular';
import {Answer} from '../../models/survey/answer';
import {Response} from '../../models/survey/response';
import {Selection} from '../../models/survey/selection';
import {Option} from '../../models/survey/option';

@Component({
  selector: 'checkbox',
  templateUrl: 'build/components/checkbox/checkbox.component.html',
  directives: [Item, Label, Checkbox],
  inputs: ['answer']
})

export class CheckboxComponent {
  answer: Answer;
  selection: Selection[];
  id: number;
  response: Response;

  getValue(res: Option) {
    console.log('response:', res);
  }
}

