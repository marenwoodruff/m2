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
  public surveys: Survey[];
  public survey: Survey;
  private currentLocation: Array<number>;

  constructor(private nav: NavController, private platform: Platform, private _surveyApi: SurveyService, private _eventApi: EventService) {
  }

  public ngOnInit() {
    this.surveySubscription = this._eventApi.eventSurveys.subscribe(
      (surveys) => {
        console.log(surveys);
        this.surveys = surveys;
        this.survey = this.surveys[0];
      },
      err => console.log('error', err),
      () => console.log('finished checking for event surveys')
    );

    this._eventApi.getEventSurvey(this.event.eventId);
  }

  public ngOnChanges() {
    console.log('from event component:', this.currentLocation);
  }

  public ngOnDestroy() {
    this.surveySubscription.unsubscribe();
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