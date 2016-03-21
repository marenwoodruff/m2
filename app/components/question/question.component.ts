import {Component} from 'angular2/core';
import {Page, NavParams, Button} from 'ionic-angular';
import {Question} from '../../models/survey/question';
import {AnswerComponent} from '../answer/answer.component';

@Component({
  selector: 'question',
  templateUrl: 'build/components/question/question.component.html',
  directives: [Button, AnswerComponent],
  inputs: ['question']
})


export class QuestionComponent {
  question: Question;
  saved: boolean = false;

  saveProgress(survey) {
    console.log('saving', survey);
    this.saved = true;
    return this.saved;
  }

  onSubmit(survey) {
    console.log('submitting', survey);
  }
}
