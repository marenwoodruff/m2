  import {Page} from 'ionic-angular';
  import {EventEmitter, OnInit, OnDestroy, OnChanges} from 'angular2/core';
  import {SurveysComponent} from '../../components/surveys/surveys.component';
  import {StorageService} from '../../service/storage.service';
  import {SurveyService} from '../../service/survey.service';
  import {Survey} from '../../models/survey/survey';
  import {SurveyProgress} from '../../models/survey/surveyProgress';


  @Page({
    templateUrl: 'build/pages/surveys/surveys.page.html',
    directives: [SurveysComponent]
  })

  export class SurveysPage implements OnInit, OnDestroy, OnChanges {
      public surveys: Survey[];
      public startedSurveys: Survey[];
      public surveyIds = [];
      private surveySubscription: EventEmitter<Survey[]>;
      private storageSubscription: EventEmitter<Survey[]>;
      surveysInProgress: SurveyProgress[];

      constructor(private _surveyApi: SurveyService, private _storageApi:StorageService) { }

      ngOnInit():any {
        this.surveySubscription = this._surveyApi.surveys.subscribe(
          (surveys) => {
            this.surveys = surveys;
            this.checkSurveyProgress(this.surveys);
          },
          err => console.log('SurveysComponent surveyservice subscribe error:', err),
          () =>  console.log('finished subscribing to surveys')
        );

        this.storageSubscription = this._storageApi.surveyProgress.subscribe(
          (progressSurveys) => {
            this.startedSurveys = progressSurveys;
            this.surveysInProgress = progressSurveys.map((sip) => {
              let lastQuestionId = this.findQuestionId(sip);
              return {
                surveyId: sip.id,
                lastQuestionId,
              }
            });
          },
          err => console.log('SurveysComponent storageservice subscribe error:', err),
          () => {
            console.log('finished subscribing to storage surveys')
          }
        );

        this._surveyApi.getSurveys();
      }

      ngOnDestroy() {
        this.surveySubscription.unsubscribe();
        this.storageSubscription.unsubscribe();
      }

      ngOnChanges() {
        if (this.startedSurveys) {
          this.compareSurveys();
        }
      }

      findQuestionId(survey) {
        let
            lastQuestionAnsweredFound = false,
            questionId = null;

        survey.questions.forEach((question) => {
          if (lastQuestionAnsweredFound === false) {
            let questionAnswered = false;
            question.answer.options.forEach((option) => {
              if (option.selected === true && lastQuestionAnsweredFound === false) {
                questionAnswered = true;
                questionId = question.questionId;
              }
            });
            if (questionAnswered === false) {
              lastQuestionAnsweredFound = true;
            }
          }
        });
        return questionId;
      }

      compareSurveys() {
        this.startedSurveys.forEach((progressSurvey) => {
          this.surveys.forEach((survey) => {
            if (survey.id === progressSurvey.id) {
              survey = progressSurvey;
            }
          });
        });
        console.log(this.surveys);
      }

      checkSurveyProgress(surveys) {
        surveys.forEach((survey) => {
          this._storageApi.getSurveyProgress(survey.id);
        });
      }

  }
