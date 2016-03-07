import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

export module Matrix.MyMatrix {

    @Injectable()
    export class EventService {
        constructor(private http:Http) {

        }
    }
}
