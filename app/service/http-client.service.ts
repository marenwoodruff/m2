import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import MyMatrixApi from '../constants/apiConstants';

@Injectable()
export class HttpClient {
  public proxy: string = 'localhost:1337/';
  constructor(private _api:Http) { }

  public get(path:string, headers?:Headers) {
    return this._api.get('http://' +  MyMatrixApi + path, { headers: headers });
  }

  public getEvents(url:string, headers?:Headers) {
    return this._api.get('http://' + url, { headers: headers });
  }

  public post(path:string, headers:any, data:any) {
    return this._api.post('http://' + MyMatrixApi + path, data, {headers: headers});
  }
}
