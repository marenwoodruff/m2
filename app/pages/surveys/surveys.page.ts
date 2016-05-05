  import {Page} from 'ionic-angular';
  import {EventEmitter, OnInit, OnDestroy} from 'angular2/core';
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
      private userEventSubscription: EventEmitter<UserEvent[]>;
      private isLoading: boolean = true;
      private userId: number;
      surveysInProgress: SurveyProgress[];

      constructor(private _surveyApi: SurveyService, private _storageApi:StorageService, private _eventApi: EventService, private _userEventApi:UserEventService, private _userApi:UserService) { }

      ngOnInit(): any {
        this.getUserId();

        this.userEventSubscription = this._userEventApi.userEvents.subscribe(
          (userEvents) => {
            if (userEvents.length > 0) {
              userEvents.forEach((event) => {
                this._surveyApi.getSurveyForEvents(event.eventId);
              });
            } else {
              this.isLoading = false;
            }
          },
          (err) => console.log(err),
          () => console.log('we have user events')
        );

        this.eventSurveySubscription = this._surveyApi.eventSurveys.subscribe(
          (eventSurveys) => {
            if (eventSurveys.length > 0) {
              eventSurveys.forEach((survey) => {
                this._surveyApi.getSurveys(survey.surveyId);
              });
            } else {
              this.isLoading = false;
            }
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

        this._userEventApi.getUserEvents(this.userId);
      }

      ngOnDestroy() {
        this.surveySubscription.unsubscribe();
        this.storageSubscription.unsubscribe();
        this.eventSurveySubscription.unsubscribe();
        this.userEventSubscription.unsubscribe();
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

  }
