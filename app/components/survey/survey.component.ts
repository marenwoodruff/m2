import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, AbstractControl, ControlGroup, NgFormControl} from 'angular2/common';
import {Button, Item, Label, TextArea, Checkbox} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';

@Component({
  selector: 'survey',
  templateUrl: 'build/components/survey/survey.component.html',
  directives: [FORM_DIRECTIVES, Button, Item, Label, TextArea, Checkbox],
  inputs: ['survey']
})

export class SurveyComponent {
  survey: Survey
  surveyForm: ControlGroup;
  radio: AbstractControl;
  textBox: AbstractControl;
  checkBox: AbstractControl;

  constructor(builder: FormBuilder) {
    this.surveyForm = builder.group({
      'radio': ['', Validators.required],
      'textBox': ['', Validators.minLength(5)],
      // 'checkBox': ['', Validators.required]
    });
    this.radio = this.surveyForm.controls['radio'];
    this.textBox = this.surveyForm.controls['textBox'];
    // this.checkBox = this.surveyForm.controls['checkBox'];
  }

  selectOption(options, option) {
    options.forEach(function(opt) {
      if (opt.value === option.value) {
        opt.selected = true;
      } else {
        opt.selected = false;
      }
      return opt;
    });
    console.log(this.surveyForm.valid);
  }

  textChange() {
    console.log(this.surveyForm.valid);
  }

  checkOption(option) {
    if (option.selected) {
      option.selected = false;
    } else {
      option.selected = true;
    }
    console.log(option);
    console.log(this.surveyForm.valid);
    return option.selected;
  }

  saveProgress(survey) {
    console.log(survey);
  }

  onSubmit(survey) {
    console.log('submitting: ', survey);
  }
}