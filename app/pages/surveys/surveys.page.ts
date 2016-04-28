  import {Page} from 'ionic-angular';
  import {EventEmitter, OnInit, OnDestroy} from 'angular2/core';
  import {SurveysComponent} from '../../components/surveys/surveys.component';
  import {StorageService} from '../../service/storage.service';
  import {SurveyService} from '../../service/survey.service';
  import {EventService} from '../../service/event.service';
  import {Survey} from '../../models/survey/survey';
  import {SurveyProgress} from '../../models/survey/surveyProgress';
  import {Event} from '../../models/Events/event';
  import {LoaderComponent} from '../../components/loader/loader.component';


  @Page({
    templateUrl: 'build/pages/surveys/surveys.page.html',
    directives: [SurveysComponent, LoaderComponent]
  })

  export class SurveysPage implements OnInit, OnDestroy {
      public surveys: Survey[];
      public events: Event[];
      public startedSurveys: Survey[];
      public surveyIds = [];
      private surveySubscription: EventEmitter<Survey[]>;
      private storageSubscription: EventEmitter<Survey[]>;
      private eventSurveySubscription: EventEmitter<any>;
      private isLoading: boolean = true;
      surveysInProgress: SurveyProgress[];

      constructor(private _surveyApi: SurveyService, private _storageApi:StorageService, private _eventApi: EventService) { }

      ngOnInit():any {

        this.eventSurveySubscription = this._surveyApi.eventSurveys.subscribe(
          (eventSurveys) => {
            eventSurveys.forEach((survey) => {
              this._surveyApi.getSurveys(survey.surveyId);
            });
          },
          (err) => console.log(err),
          () => console.log('have survey ids based on events')
        );

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

        this._surveyApi.getSurveyForEvents();
      }

      ngOnDestroy() {
        this.surveySubscription.unsubscribe();
        this.storageSubscription.unsubscribe();
        this.eventSurveySubscription.unsubscribe();
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
                questionId = question.id;
              }
            });
            if (questionAnswered === false) {
              lastQuestionAnsweredFound = true;
            }
          }
        });
        return questionId;
      }

      checkSurveyProgress(surveys) {
        surveys.forEach((survey) => {
          this._storageApi.getSurveyProgress(survey.id);
        });
        this.isLoading = false;
      }

  }
