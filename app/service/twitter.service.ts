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
    twitterCredentials:EventEmitter<any> = new EventEmitter();

    constructor(private http: Http) {
      this._api = http;
    }
    getBearer() {
      const encodedBearerTokenCredentials = 'CWNkbHZKMkU0cEY2RzdSWE5KM0pnMGlqeTk6ek1oaUd0V2NyeXFhQVhTZFp3eUNhYWhtOW1nUnFxWGtTWTBCUDg1em5jc3pGdWxISTQNCg==';
      let key = "cdlvJ2E4pF6G7RXNJ3Jg0ijy9";
      let secret = "zMhiGtWcryqaAXSdZwyCaahm9mgRqqXkSY0BP85zncszFulHI4";

      let bearerRequest = btoa(key + ':' + secret);
      let headers = new Headers();
      headers.set("Authorization", "Basic " + encodedBearerTokenCredentials);
      headers.set("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
      console.log('headers', headers);

    this._api.post('https://api.twitter.com/oauth2/token', "grant_type=client_credentials", {headers: headers})
        .map(res => <any>res.json())
        .subscribe(
          credentials => this.twitterCredentials = credentials,
          err => console.log('this is the error', err),
          () => console.log('Bearer Token retrieval is completed'));
          this.twitterCredentials.emit(this.twitterCredentials);
    }
    getMatrixFeed() {

      let headers = new Headers();
      headers.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAABWruAAAAAAAmYTQM0oq16eaD%2FKtouB6FzJmVRI%3Dc6vo5GlwjWZWEc27ALYnoBI2M1ETx0UvvSMo8T50iHTPiPcE4F");
      headers.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

      this._api.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=matrixresources', headers)
        .map(res => <TwitterFeed[]> res.json())
        .subscribe(
            matrixFeed =>this.feed.emit(matrixFeed),
            err => console.log(err),
            () => console.log('Matrix Twitter Feed retrieval is completed'));
    }
}
