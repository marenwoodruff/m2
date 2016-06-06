import {Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {NavController, NavParams, List, Item, Button, Platform, Alert} from 'ionic-angular';
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

@Component({
  selector: 'event',
  templateUrl: 'build/components/event/event.component.html',
  inputs:['event', 'currentLocation'],
  directives: [List, Item, SessionComponent, EventLocationComponent, Button],
  pipes:[DateFormatPipe, FromUnixPipe]
})

export class EventComponent implements OnInit, OnDestroy {
  public event: Event;
  private surveySubscription: EventEmitter<Survey[]>;
  private userEventSubscription: EventEmitter<UserEvent>;
  private userSubscription: EventEmitter<User>;
  public surveys: Survey[];
  public survey: Survey;
  private currentLocation: Array<number>;
  private registered: boolean;
  private userId: number;
  private user: User;

  constructor(
      private nav: NavController,
      private platform: Platform,
      private _surveyApi: SurveyService,
      private _eventApi: EventService,
      private _userEventApi: UserEventService,
      private _userApi: UserService) { }

  public ngOnInit() {
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
        this.survey = this.surveys[0];
      },
      err => console.log('error', err),
      () => console.log('finished checking for event surveys')
    );

    this.getUserId();
    this.checkRegistration();
    this._eventApi.getEventSurvey(this.event.eventId);
  }

  public ngOnDestroy() {
    this.surveySubscription.unsubscribe();
    this.userEventSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
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
      user:  this.user
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
    })
  }

  private viewSurveys(): void {
    this.nav.push(EventSurveysPage, {
      surveys: this.surveys,
      event: this.event
    })
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

  public nonMatrixInfo(link:string):void {
    let url = 'http://matrixres.com' + link;
    this.platform.ready().then(() => {
      cordova.InAppBrowser.open(url, "_system", "location=true");
    });
  }

  private save(event:Event): void {
    let userEvent = {
      eventId: event.eventId,
      registered: true,
      userId: this.userId,
      title: event.title,
      startDate: event.startDate,
      city: event.city,
      state: event.state,
      mobileSmall: event.mobileSmall
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
}
