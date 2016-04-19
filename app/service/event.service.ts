import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {Survey} from '../models/survey/survey';

import {HttpClient} from './http-client.service';

@Injectable()
export class EventService {

    events: EventEmitter<Event[]> = new EventEmitter();
    eventSurveys: EventEmitter<Survey[]> = new EventEmitter();

    constructor(private httpClient: HttpClient) { }

    public getEvents(): void {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', 'http://google.com');
      this.httpClient.get("www.matrixres.com/apis/eventapi", headers)
            .map(res => <Event[]>res.json().events)
            .subscribe(
            events => this.events.emit(events),
            err => console.log(err),
            () => console.log('Events retrieval is completed')
          );
    };

    public getEventSurvey(eventId:number): void {
      this.httpClient.get("mymatrixapidev.azurewebsites.net/surveys/events/" + eventId)
        .map((res) => {
          return res.json();
        })
        .subscribe(
          surveys => this.eventSurveys.emit(surveys),
          err => console.log(err),
          () => console.log('we have surveys for this event')
        );
    }
}
