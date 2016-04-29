import {OnInit} from 'angular2/core';
import {Page} from 'ionic-angular';
import {NavController, NavParams, Button} from 'ionic-angular';
import {Survey} from '../../models/survey/survey';
import {SurveyPage} from '../survey/survey.page';
import {SurveyCompletedPage} from '../survey-completed/survey-completed.page';
import {SurveyProgress} from '../../models/survey/surveyProgress';

@Page({
  templateUrl: 'build/pages/begin-survey/begin-survey.page.html',
  directives: [Button]
})

export class BeginSurveyPage implements OnInit {
  survey: Survey;
  surveyTime: String;
  inProgress: boolean;
  surveyProgress: SurveyProgress;
  surveyStartText: String;
  lastQuestionIndex: number;

  constructor(private nav: NavController, private params: NavParams) {
    this.survey = this.params.get('survey');
    this.inProgress = this.params.get('inProgress');
    this.surveyProgress = this.params.get('surveyProgress');
  }

  public ngOnInit(): void {
    if (!this.surveyProgress) {
      const
        length = this.survey.questions.length,
        surveyMinTime = Math.floor(length * 0.30),
        surveyMaxTime = length * 0.50;

      this.surveyTime = (`${surveyMinTime} - ${surveyMaxTime} mins`);
      this.surveyStartText = 'Begin Survey';
    } else {
      this.survey.questions.forEach((question, idx) => {
        if (question.id === this.surveyProgress.lastQuestionId) {
          this.lastQuestionIndex = idx;
        }
      });

      let
        length = this.lastQuestionIndex ? this.survey.questions.length - (this.lastQuestionIndex + 1) : this.survey.questions.length,
        surveyMinTime = Math.floor(length * 0.30),
        surveyMaxTime = length * 0.50;

      this.surveyTime = (`${surveyMinTime} - ${surveyMaxTime} mins remaining`);
      this.surveyStartText = 'Continue Survey';
    }
  }

  private viewSurvey(survey, lastQuestionIndex): void {
    this.nav.push(SurveyPage, {
      survey,
      lastQuestionIndex,
      inProgress: this.inProgress
    });
  }

}
