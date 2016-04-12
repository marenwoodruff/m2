import {Component, OnInit, OnDestroy, EventEmitter} from 'angular2/core';
import {NavController, NavParams, List, Item, Button, Platform} from 'ionic-angular';
import {SurveyService} from '../../service/survey.service';
import {Event} from '../../models/events/event';
import {Survey} from '../../models/survey/survey';
import {SessionComponent} from '../session/session.component';
import {EventLocationComponent} from '../event-location/event-location.component';
import {DateFormatPipe, FromUnixPipe} from 'angular2-moment';
import {RegistrationPage} from '../../pages/registration/registration.page';
import {BeginSurveyPage} from '../../pages/begin-survey/begin-survey.page';

@Component({
  selector: 'event',
  templateUrl: 'build/components/event/event.component.html',
  inputs:['event'],
  directives: [List, Item, SessionComponent, EventLocationComponent, Button],
  pipes:[DateFormatPipe, FromUnixPipe]
})

export class EventComponent implements OnInit, OnDestroy {
  public event: Event;
  private surveySubscription: EventEmitter<Survey[]>;
  public surveys: Survey[];
  public survey: Survey;

  constructor(private nav: NavController, private platform: Platform, private _surveyApi: SurveyService) {
  }

  public ngOnInit() {
    this.surveySubscription = this._surveyApi.surveys.subscribe(
      (surveys) => {
        this.surveys = surveys;
        if (this.surveys.length === 1) {
          this.survey = this.surveys[0];
          console.log(this.survey);
        }
      },
      err => console.log('error', err),
      () => console.log('finished checking for event survey')
    );

    this._surveyApi.getSurveys(null, this.event.eventId);
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

  public launchUrl(url: string): void {
    this.platform.ready().then(() => {
      cordova.InAppBrowser.open(url, "_system", "location=true");
    });
  }
}