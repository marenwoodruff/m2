import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Headers, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthorizationService {
  private _api: Http;
  bearerToken: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) {
    this._api = http;
  }
}


