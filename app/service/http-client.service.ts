import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class HttpClient {
  public proxy: string = 'localhost:1337/';
  constructor(private _api:Http) { }

  public get(url:string, headers?:Headers) {
    return this._api.get('http://' + this.proxy + url, { headers: headers });
  }

  public post(url:string, data:any) {
    return this._api.post('http://' + this.proxy + url, data);
  }
}
