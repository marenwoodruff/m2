import {Component, OnInit, OnDestroy, OnChanges, EventEmitter} from 'angular2/core';
import {NavController, NavParams, List, Item, Button, Platform} from 'ionic-angular';
import {SurveyService} from '../../service/survey.service';
import {Event} from '../../models/events/event';
import {Survey} from '../../models/survey/survey';
import {SessionComponent} from '../session/session.component';
import {EventLocationComponent} from '../event-location/event-location.component';
import {DateFormatPipe, FromUnixPipe} from 'angular2-moment';
import {RegistrationPage} from '../../pages/registration/registration.page';
import {BeginSurveyPage} from '../../pages/begin-survey/begin-survey.page';
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

export class EventComponent implements OnInit, OnDestroy, OnChanges {
  public event: Event;
  private surveySubscription: EventEmitter<Survey[]>;
  private userEventSubscription: EventEmitter<UserEvent>;
  public surveys: Survey[];
  public survey: Survey;
  private currentLocation: Array<number>;
  private registered: boolean;
  private userId: number;

  constructor(private nav: NavController, private platform: Platform, private _surveyApi: SurveyService, private _eventApi: EventService, private _userEventApi: UserEventService, private _userApi: UserService) { }

  public ngOnInit() {

    this.getUserId();

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

    this.checkRegistration();
    this._eventApi.getEventSurvey(this.event.eventId);
  }

  public ngOnChanges() {
    console.log('from event component:', this.currentLocation);
  }

  public ngOnDestroy() {
    this.surveySubscription.unsubscribe();
    this.userEventSubscription.unsubscribe();
  }

  private getUserId() {
    this.userId = this._userApi.getUserId();
  }

  private checkRegistration() {
    this._userEventApi.getUserEvents(this.userId, this.event.eventId);
  }

  private register(event): void {
    this.nav.push(RegistrationPage, {
      event: event
    });
  }

  private takeSurvey(): void {
    this.nav.push(BeginSurveyPage, {
      survey: this.survey
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
}