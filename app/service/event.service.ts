import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
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
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', 'http://google.com');
      this._api.get("http://localhost:1337/www.matrixres.com/apis/eventapi", { headers: headers })
            .map(res => <Event[]>res.json().events)
            .subscribe(
            events => this.events.emit(events),
            err => console.log(err),
            () => console.log('Events retrieval is completed')
          );
    };
}
