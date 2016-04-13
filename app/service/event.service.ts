import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EventService {

    private _api: Http;
    events: EventEmitter<Event[]> = new EventEmitter();


    constructor(private http: Http) {
        this._api = http;
    }

    public getEvents(): void {
        this._api.get("build/assets/events.json")
            .map(res => <Event[]>res.json().events)
            .subscribe(
            events => this.events.emit(events),
            err => console.log(err),
            () => console.log('Events retrieval is completed')
          );
    };
}
