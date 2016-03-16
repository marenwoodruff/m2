import {Injectable, EventEmitter} from 'angular2/core';
import {Http} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {TwitterFeed} from '../modules/twitter/twitter';

@Injectable()
export class TwitterService {
    private _api:Http;
    feed:EventEmitter<TwitterFeed[]> = new EventEmitter();

    constructor(private http: Http) {
      this._api = http;
    }
    getMatrixFeed() {
      this._api.get('https://api.twitter.com/1.1/search/tweets.json')
        .map(res => <TwitterFeed[]> res.json())
        .subscribe(
            matrixFeed =>this.feed.emit(matrixFeed),
            err => console.log(err),
            () => console.log('Matrix Twitter Feed retrieval is completed'));
    }
}
