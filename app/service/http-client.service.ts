import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {StorageService} from './storage.service';
import MyMatrixApi from '../constants/apiConstants';

@Injectable()
export class HttpClient {
  public proxy: string = '';
  constructor(private _api:Http, private _storageService: StorageService) { }

  public get(path:string, headers?:Headers) {
    return this._api.get('http://' +  MyMatrixApi + path, { headers: headers });
  }

  public getEvents(url:string, headers?:Headers) {
    return this._api.get('http://' + url, { headers: headers });
  }

  public post(path:string, data:any) {
    return this._api.post('http://' + MyMatrixApi + path, data, {headers: this.createHeaders()});
  }
  public createHeaders(): Headers {
    let headers = new Headers();
    const token = this._storageService.getItem('MyMatrixAuthToken')
    if (token){
      headers.append('Authorization', token);
    }
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  public put(path:string, data:any) {
    return this._api.put('http://' + MyMatrixApi + path, data, {headers: this.createHeaders()});
  }

  public delete(path:string) {
    return this._api.delete('http://' + MyMatrixApi + path, {headers: this.createHeaders()});
  }
}
