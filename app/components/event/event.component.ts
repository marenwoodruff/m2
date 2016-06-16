import {Component, OnInit, OnDestroy, EventEmitter, DoCheck} from '@angular/core';
import {Nav, NavParams, List, Item, Button, Platform, Alert} from 'ionic-angular';
import {SurveyService} from '../../service/survey.service';
import {Event} from '../../models/events/event';
import {Survey} from '../../models/survey/survey';
import {User} from '../../models/user/user';
import {SessionComponent} from '../session/session.component';
import {EventLocationComponent} from '../event-location/event-location.component';
import {DateFormatPipe, FromUnixPipe} from 'angular2-moment';
import {RegistrationPage} from '../../pages/registration/registration.page';
import {BeginSurveyPage} from '../../pages/begin-survey/begin-survey.page';
import {EventSurveysPage} from '../../pages/event-surveys/event-surveys.page';
import {EventService} from '../../service/event.service';
import {UserEventService} from '../../service/userEvent.service';
import {UserService} from '../../service/user.service';
import {UserEvent} from '../../models/user/userEvent';
import * as moment from 'moment';

@Component({
  selector: 'event',
  templateUrl: 'build/components/event/event.component.html',
  inputs: ['event', 'currentLocation'],
  directives: [List, Item, SessionComponent, EventLocationComponent, Button],
  pipes: [DateFormatPipe, FromUnixPipe]
})

export class EventComponent implements OnInit, OnDestroy, DoCheck {
  public event: Event;
  private surveySubscription: EventEmitter<Survey[]>;
  private userEventSubscription: EventEmitter<UserEvent>;
  private userSubscription: EventEmitter<User>;
  private completedSurveysSubscription: EventEmitter<any>;
  public surveys: Survey[];
  public survey: Survey;
  private currentLocation: Array<number>;
  private registered: boolean;
  private userId: number;
  private user: User;
  private eventOverview: any;
  private preEvent: boolean;
  public imageThumbnail: boolean;
  private completedSurveys: Array<any>;
  private updated: boolean;

  constructor(
    private nav: Nav,
    private platform: Platform,
    private _surveyApi: SurveyService,
    private _eventApi: EventService,
    private _userEventApi: UserEventService,
    private _userApi: UserService) { }

  public ngOnInit() {
      console.log(this.event);
    this.userSubscription = this._userApi.user.subscribe(
      user => this.user = user,
      err => console.log(err),
      () => console.log('got user info')
    );

    this.userEventSubscription = this._userEventApi.userEvents.subscribe(
      event => event.length > 0 ? this.registered = true : this.registered = false,
      err => console.log('err: ', err),
      () => console.log('user event over')
    );

    this.surveySubscription = this._eventApi.eventSurveys.subscribe(
      (surveys) => {
        this.surveys = surveys;
      },
      err => console.log('error', err),
      () => console.log('finished checking for event surveys')
    );

    this.completedSurveysSubscription = this._surveyApi.completedSurveys.subscribe(
      (completedSurveys) => {
          this.completedSurveys = completedSurveys;
      },
      (err) => console.log(err),
      () => console.log('completed surveys completed')
    );

    this.getUserId();
    this.checkRegistration();
    this._eventApi.getEventSurvey(this.event.eventId);
    this._surveyApi.getUserCompletedSurveys(this.userId);

    if (this.event.title === 'Agile2016') {
      this.eventOverview = this.event.overview;
      this.updateEventOverview(this.eventOverview);
    }

    let
      imageThumbnail = true,
      mobileSmall = this.event.mobileSmall,
      mobileLarge = this.event.mobileLarge,
      facilitatorImage = this.event.facilitatorImage;

    if (mobileSmall == "" || mobileLarge == "") {
      this.imageThumbnail = false;
    } else if (facilitatorImage == "") { 
      this.imageThumbnail = false;
    } else {
      this.imageThumbnail = true;
    }
  }

  public ngOnDestroy() {
    this.surveySubscription.unsubscribe();
    this.userEventSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  public ngDoCheck() {
    if (this.surveys && this.completedSurveys && !this.updated) {
        this.filterCompletedSurveys(this.surveys, this.completedSurveys);
        this.updated = true;
    }
  }

  private updateEventOverview(eventOverview:any): void {
    let regex = /([..])\.+/;
    let regex2 = /(#signup)/;
    this.eventOverview = this.eventOverview.replace(regex2, 'https://agilealliance.org/membership/?rt=Subscriber').replace(regex, 'http://matrixres.com');
    this.event.overview = this.eventOverview;
  }

  private getUserId() {
    this.userId = this._userApi.getUserId();
    this._userApi.getUser(this.userId);
  }

  private checkRegistration() {
    this._userEventApi.getUserEvents(this.userId, this.event.eventId);
  }

  private register(event): void {
    this.nav.push(RegistrationPage, {
      event: event,
      user: this.user
    });
  }

  private registerFriend(event): void {
    this.nav.push(RegistrationPage, {
      event: event
    });
  }

  private takeSurvey(survey): void {
      this.nav.push(BeginSurveyPage, {
          survey: survey
      });
  }

  private viewSurveys(): void {
      this.nav.push(EventSurveysPage, {
          surveys: this.surveys,
          event: this.event
      });
  }

  public launchNavigator(coordinates: string, city: string): void {
    console.log(this.currentLocation);
    let navCoordinates = coordinates.split(',').splice(0, 2);
    if (this.currentLocation) {
      launchnavigator.navigate(navCoordinates, {
        start: this.currentLocation
      });
    } else {
      launchnavigator.navigate(navCoordinates, {
        start: city
      });
    }
  }

  public launchUrl(url: string): void {
    this.platform.ready().then(() => {
      cordova.InAppBrowser.open(url, "_system", "location=true");
    });
  }

  public nonMatrixInfo(link: string): void {
    let url = 'http://matrixres.com' + link;
    this.platform.ready().then(() => {
      cordova.InAppBrowser.open(url, "_system", "location=true");
    });
  }

  private save(event:Event): void {
    let matrixEvent = this.event.nonMatrixEvent ? false : true;
    let userEvent = {
      eventId: event.eventId,
      registered: true,
      userId: this.userId,
      title: event.title,
      startDate: event.startDate,
      city: event.city,
      state: event.state,
      mobileSmall: event.mobileSmall,
      matrixEvent: matrixEvent
    };

    this.saveAlert(userEvent);
  }

  private saveAlert(userEvent) {
    let alert = Alert.create({
      title: 'Saving Event',
      subTitle: 'Saving this event does not mean that you are registered. Please click the information button for registration instructions.',
      buttons: [
        {
          text: 'Save',
          handler: () => {
            this._userEventApi.createUserEvent(this.userId, userEvent);
            this.registered = true;
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            this.registered = false;
          }
        }
      ]
    });
    this.nav.present(alert);
  }

  private filterCompletedSurveys(surveys: Survey[], completedSurveys: Array<any>) {
    this.surveys = surveys.filter((survey) => {
        let match = completedSurveys.find(completedSurvey => completedSurvey.surveyId === survey.id);
        if (!match) {
            return true;
        }
    });
    if (this.surveys) {
      this.survey = this.surveys[0];
      if (surveys.length === 1) {
          this.findPreEvent(this.event);
      }
    }
  }

  private findPreEvent(event:Event) {
    if (moment.unix(event.startDate).isSameOrAfter() && this.survey) {
      this.preEvent = true;
      this.preEventSurvey(this.survey);
    } else {
      this.preEvent = false;
      this.postEventSurvey(this.survey);
    }
  }

  private preEventSurvey(survey:Survey) {
    if (this.survey.preEvent === true) {
      this.survey;
    } else {
      this.survey = null;
    }
  }

  private postEventSurvey(survey:Survey) {
    if (this.survey.preEvent === false) {
        this.survey;
    } else {
        this.survey = null;
    }
  }
}
