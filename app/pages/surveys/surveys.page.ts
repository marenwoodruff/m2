  import {Page} from 'ionic-angular';
  import {EventEmitter, OnInit, OnDestroy} from 'angular2/core';
  import {SurveysComponent} from '../../components/surveys/surveys.component';
  import {StorageService} from '../../service/storage.service';
  import {SurveyService} from '../../service/survey.service';
  import {EventService} from '../../service/event.service';
  import {Survey} from '../../models/survey/survey';
  import {SurveyProgress} from '../../models/survey/surveyProgress';
  import {Event} from '../../models/Events/event';


  @Page({
    templateUrl: 'build/pages/surveys/surveys.page.html',
    directives: [SurveysComponent]
  })

  export class SurveysPage implements OnInit, OnDestroy {
      public surveys: Survey[];
      public events: Event[];
      public startedSurveys: Survey[];
      public surveyIds = [];
      private surveySubscription: EventEmitter<Survey[]>;
      private storageSubscription: EventEmitter<Survey[]>;
      private eventSubscription: EventEmitter<Event[]>;
      surveysInProgress: SurveyProgress[];

      constructor(private _surveyApi: SurveyService, private _storageApi:StorageService, private _eventApi: EventService) { }

      ngOnInit():any {

        this.eventSubscription = this._eventApi.events.subscribe(
          (events) => {
            this.events = events;
            this.getSurveysForEvents(this.events);
          },
          (err) => console.log(err),
          () => console.log('event success')
        );

        this.surveySubscription = this._surveyApi.surveys.subscribe(
          (surveys) => {
            this.surveys = surveys;
            console.log(this.surveys);
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

        this._eventApi.getEvents();
      }

      ngOnDestroy() {
        this.surveySubscription.unsubscribe();
        this.storageSubscription.unsubscribe();
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
      }

      getSurveysForEvents(events:Event[]) {
        events.forEach((event) => {
          this._surveyApi.getSurveyForEvents(event.eventId);
        });
      }

  }
