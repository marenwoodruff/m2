import {Component, OnInit} from 'angular2/core';
import {Answer} from '../../survey/answer';
import {Item, Label, RadioGroup, RadioButton} from 'ionic-angular';
import {RadioButtonComponent} from '../radio-button/radio-button.component';
import {TextboxComponent} from '../textbox/textbox.component';
import {CheckboxComponent} from '../checkbox/checkbox.component';

@Component({
  selector: 'answer',
  templateUrl: 'build/modules/components/answer/answer.component.html',
  directives: [Item, Label, RadioGroup, RadioButton, RadioButtonComponent, TextboxComponent, CheckboxComponent],
  inputs: ['answer']
})


export class AnswerComponent implements OnInit {
  answer: Answer;

  ngOnInit() {
    console.log(this.answer);
  }


}
