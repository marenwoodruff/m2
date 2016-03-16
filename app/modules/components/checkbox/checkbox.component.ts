import {Component} from 'angular2/core';
import {Item, Label, Checkbox} from 'ionic-angular';
import {Answer} from '../../survey/answer';
import {Response} from '../../survey/response';
import {Option} from '../../survey/option';

@Component({
  selector: 'checkbox',
  templateUrl: 'build/modules/components/checkbox/checkbox.component.html',
  directives: [Item, Label, Checkbox],
  inputs: ['answer']
})

export class CheckboxComponent {
  answer: Answer;
  response: Response;

  getValue(id: number, res: Option) {
    console.log('questionId:', id, ' response:', res);
  }
}