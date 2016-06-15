import * as moment from 'moment';
import {Page} from 'ionic-angular';
import {EventEmitter, OnInit, OnDestroy, DoCheck} from '@angular/core';
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
  templateUrl: 'build/pages/surveys/surveys.page.html',
  directives: [SurveysComponent, LoaderComponent]
})

export class SurveysPage implements OnInit, OnDestroy, DoCheck {
  public surveys: Survey[];
  public allSurveys: Survey[];
  public events: Event[];
  public startedSurveys: Survey[];
  public userEvents: UserEvent[];
  public eventSurveys: Array<any>;
  public completedSurveys: UserSurvey[];
  public surveyIds = [];
  private surveySubscription: EventEmitter<Survey[]>;
  private storageSubscription: EventEmitter<Survey[]>;
  private eventSurveySubscription: EventEmitter<any>;
  private userEventSubscription: EventEmitter<UserEvent[]>;
  private completedSurveysSubscription: EventEmitter<UserSurvey[]>;
  private isLoading: boolean = true;
  private userId: number;
  private surveysInProgress: SurveyProgress[];
  public eventSurveysPage: boolean = false;
  public preEvents: Array<any>;
  public postEvents: Array<any>;
  private preEventSurveys: Array<any>;
  private postEventSurveys: Array<any>;

  constructor(private _surveyApi: SurveyService, private _storageApi:StorageService, private _eventApi: EventService, private _userEventApi:UserEventService, private _userApi:UserService) { }

  ngOnInit(): any {
    this.getUserId();
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

    this.eventSurveySubscription = this._surveyApi.eventSurveys.subscribe(
      (eventSurveys) => {
        if (eventSurveys.length > 0) {
          this.eventSurveys = eventSurveys;
        } else {
          this.isLoading = false;
        }
      },
      (err) => console.log(err),
      () => console.log('have survey ids based on events')
    );

    this.surveySubscription = this._surveyApi.surveys.subscribe(
      (surveys) => {
        this.allSurveys = surveys;
        this.checkSurveyProgress(this.allSurveys);
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

    this.completedSurveysSubscription = this._surveyApi.completedSurveys.subscribe(
      (completedSurveys) => this.completedSurveys = completedSurveys,
      (err) => console.log(err),
      () => console.log('finished subscribing to completed surveys')
    );

    this._surveyApi.getSurveyForEvents();
    this._surveyApi.getSurveys();
    this._userEventApi.getUserEvents(this.userId);
    this._surveyApi.getUserCompletedSurveys(this.userId);
  }

  ngOnDestroy() {
    this.surveySubscription.unsubscribe();
    this.storageSubscription.unsubscribe();
    this.eventSurveySubscription.unsubscribe();
    this.userEventSubscription.unsubscribe();
    this.completedSurveysSubscription.unsubscribe();
  }

  ngDoCheck() {
    if (this.eventSurveys && this.userEvents && this.completedSurveys) {
      this.filterEventSurveys(this.eventSurveys, this.userEvents, this.completedSurveys);
    }

    if (this.surveys && this.completedSurveys) {
      this.hideCompletedSurveys(this.surveys, this.completedSurveys);
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

  filterEventSurveys(eventSurveys:any, userEvents:UserEvent[], completedSurveys:UserSurvey[]) {
    this.eventSurveys = eventSurveys.filter((eventSurvey) => {
      let registered = userEvents.find(event => event.eventId === eventSurvey.eventId);
      if (registered) {
        return true;
      }
    });


    if (this.allSurveys && this.eventSurveys.length > 0) {
      this.getSurveysFromEvent(this.eventSurveys, this.allSurveys);
    }
  }

  getSurveysFromEvent(eventSurveys: any, surveys:any) {
      this.surveys = surveys.filter((survey) => {
        let eventSurvey = eventSurveys.find(e => e.surveyId === survey.id);
        if (eventSurvey) {
          return true;
        }
      });

      this.getPrePostEvents(this.userEvents);
  }

  hideCompletedSurveys(surveys: any, completedSurveys: UserSurvey[]) {
    this.surveys = surveys.filter((survey) => {
      let completed = completedSurveys.find(completedSurvey => completedSurvey.surveyId === survey.id);
      if (!completed) {
        return true;
      }
    });
  }

  getPrePostEvents(userEvents: any) {
    this.preEvents = userEvents.filter((event) => {
      if (moment.unix(event.startDate).isSameOrAfter()) {
        return true;
      }
    });

    this.postEvents = userEvents.filter((event) => {
      if (moment.unix(event.startDate).isSameOrBefore()) {
        return true;
      }
    });

    this.sortPreEventSurveys(this.preEvents, this.postEvents, this.eventSurveys, this.surveys);
  }

  sortPreEventSurveys(preEvents: any, postEvents: any, eventSurveys: any, surveys: Survey[]) {
    if (preEvents.length > 0) {
      this.preEventSurveys = eventSurveys.filter((eventSurvey) => {
        let preEventMatch = preEvents.find(event => event.eventId === eventSurvey.eventId);
        if (preEventMatch) {
          return true;
        }
      });

      this.surveys = surveys.filter((survey) => {
        let match = this.preEventSurveys.find(eSurvey => eSurvey.surveyId === survey.id);
        if (match && survey.preEvent === true) {
          return true;
        }
      });

      this.sortPostEventSurveys(this.postEvents, this.eventSurveys, this.surveys);
    } else if (preEvents.length <= 0 && postEvents.length <= 0) {
      this.surveys = [];
    } else {
      this.sortPostEventSurveys(this.postEvents, this.eventSurveys, this.surveys);
    }
  }

  sortPostEventSurveys(postEvents: any, eventSurveys: any, surveys: Survey[]) {
    if (postEvents.length > 0) {
      this.postEventSurveys = eventSurveys.filter((eventSurvey) => {
        let postEventMatch = postEvents.find(event => event.eventId === eventSurvey.eventId);
        if (postEventMatch) {
          return true;
        }
      });

      surveys.forEach((survey) => {
        let match = this.postEventSurveys.find(eSurvey => eSurvey.surveyId === survey.id);
        if (match && survey.preEvent === false) {
          this.surveys.push(survey);
        }
      });
    }

  }
}