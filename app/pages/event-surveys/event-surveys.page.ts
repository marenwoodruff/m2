  import {Page, NavParams} from 'ionic-angular';
  import {EventEmitter, OnInit, OnDestroy, DoCheck, forwardRef} from '@angular/core';
  import {SurveysComponent} from '../../components/surveys/surveys.component';
  import {StorageService} from '../../service/storage.service';
  import {SurveyService} from '../../service/survey.service';
  import {EventService} from '../../service/event.service';
  import {UserEventService} from '../../service/userEvent.service';
  import {UserService} from '../../service/user.service';
  import {Survey} from '../../models/survey/survey';
  import {SurveyProgress} from '../../models/survey/surveyProgress';
  import {Event} from '../../models/Events/event';
  import {UserEvent} from '../../models/user/userEvent';
  import {LoaderComponent} from '../../components/loader/loader.component';
  import {UserSurvey} from '../../models/user/userSurvey';

  @Page({
    templateUrl: 'build/pages/event-surveys/event-surveys.page.html',
    directives: [forwardRef(() => SurveysComponent), LoaderComponent]
  })

  export class EventSurveysPage implements OnInit, OnDestroy, DoCheck {
      public surveys: Survey[];
      public allSurveys: Survey[];
      public event: Event;
      public startedSurveys: Survey[];
      public userEvents: UserEvent[];
      public eventSurveys: Array<any>;
      public completedSurveys: UserSurvey[];
      public surveyIds = [];
      private storageSubscription: EventEmitter<Survey[]>;
      private userEventSubscription: EventEmitter<UserEvent[]>;
      private completedSurveysSubscription: EventEmitter<UserSurvey[]>;
      private isLoading: boolean = true;
      private userId: number;
      private surveysInProgress: SurveyProgress[];
      public eventSurveysPage: boolean = true;
      private updated: boolean = false;

      constructor(
          private _surveyApi: SurveyService,
          private _storageApi:StorageService,
          private _eventApi: EventService,
          private _userEventApi:UserEventService,
          private _userApi:UserService,
          private _params: NavParams) { }

      ngOnInit(): any {
        this.getUserId();
        this.surveys = this._params.get('surveys');
        this.event = this._params.get('event');
        this.setEventSurveys();

        this.userEventSubscription = this._userEventApi.userEvents.subscribe(
          (userEvents) => {
            if (userEvents.length > 0) {
              this.userEvents = userEvents;
            } else {
              this.isLoading = false;
            }
          },
          (err) => console.log(err),
          () => console.log('we have user events')
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

        this.completedSurveysSubscription = this._surveyApi.completedSurveys.subscribe(
          (completedSurveys) => this.completedSurveys = completedSurveys,
          (err) => console.log(err),
          () => console.log('finished subscribing to completed surveys')
        );

        this._userEventApi.getUserEvents(this.userId);
        this.checkSurveyProgress(this.surveys);
        this._surveyApi.getUserCompletedSurveys(this.userId);
      }

      ngOnDestroy() {
        this.storageSubscription.unsubscribe();
        this.userEventSubscription.unsubscribe();
        this.completedSurveysSubscription.unsubscribe();
      }

      ngDoCheck() {
        if (this.surveys && this.completedSurveys && !this.updated) {
          this.filterCompletedSurveys(this.surveys, this.completedSurveys);
        }
      }

      setEventSurveys() {
          this.eventSurveys = this.surveys.map((survey) => {
             return {
                 eventId: this.event.eventId,
                 eventTitle: this.event.title,
                 surveyId: survey.id,
                 surveyName: survey.name
             }
          });
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

      getUserId() {
        this.userId = this._userApi.getUserId();
      }


      filterCompletedSurveys(surveys:Survey[], completedSurveys:UserSurvey[]) {
          this.surveys = surveys.filter((survey) => {
              let completed = completedSurveys.find(completedSurvey => completedSurvey.surveyId === survey.id);
              if (!completed) {
                  return true;
              }
          });

          this.updated = true;
      }
  }
