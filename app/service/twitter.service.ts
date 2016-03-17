import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Headers, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {TwitterFeed} from '../models/twitter/twitter';

@Injectable()
export class TwitterService {
    private _api:Http;
    feed:EventEmitter<TwitterFeed[]> = new EventEmitter();
    bearerToken:EventEmitter<any> = new EventEmitter();

    constructor(private http: Http) {
      this._api = http;
    }
    getBearer() {
      let key = "Z3Kq0g7X3Py6H1Ot089DZQ4vh";
      let secret = "6vMzyJkVk7Z7SgAC0r6jcl8r6YUqafHbYtIJ16bRkowHAI8pNz";

      let bearerRequest = btoa(key + ':' + secret);
      console.log(bearerRequest);

      let headers = new Headers();
      headers.append("Authorization", "Basic " + bearerRequest);
      headers.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
      console.log('headers', headers);

      this._api.post('https://api.twitter.com/oauth2/token', "grant_type=client_credentials", {headers: headers})
        .map(res => res.json())
        .subscribe(
          bearer => this.bearerToken.emit(bearer),
          err => console.log(err),
          () => console.log('Bearer Token retrieval is completed'));
    }
    getMatrixFeed() {
      let testing = this.getBearer();
      console.log("testing", testing);
      // this._api.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=matrixresources&count=2')
      //   .map(res => <TwitterFeed[]> res.json())
      //   .subscribe(
      //       matrixFeed =>this.feed.emit(matrixFeed),
      //       err => console.log(err),
      //       () => console.log('Matrix Twitter Feed retrieval is completed'));
    }
}
