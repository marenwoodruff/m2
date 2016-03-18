import {Component} from 'angular2/core';
import {Item, Label, Checkbox} from 'ionic-angular';
import {Question} from '../../models/survey/question';
import {Option} from '../../models/survey/option';

@Component({
  selector: 'checkbox',
  templateUrl: 'build/components/checkbox/checkbox.component.html',
  directives: [Item, Label, Checkbox],
  inputs: ['question']
})

export class CheckboxComponent {
  question: Question;
  id: number;

  getValue(res: Option) {
    if (res.selected) {
      res.selected = false;
    } else {
      res.selected = true;
    }
  }
}

