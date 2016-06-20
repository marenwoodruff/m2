import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {StorageService} from './storage.service';
import AppSettings from '../appsettings';

@Injectable()
export class HttpClient {

  public proxy: string = '';
  constructor(private _api:Http, private _storageService: StorageService) {}

  public get(path:string, headers?:Headers) {
    return this._api.get(`${AppSettings.baseApiUrl}${path}`, { headers: headers });
  }

  public getEvents() {
      return this._api.get(`${AppSettings.eventApiUrl}`);
  }

  public post(path:string, data:any) {
    return this._api.post(`${AppSettings.baseApiUrl}${path}`, data, {headers: this.createHeaders()});
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
    return this._api.put(`${AppSettings.baseApiUrl}${path}`, data, {headers: this.createHeaders()});
  }

  public delete(path:string) {
    return this._api.delete(`${AppSettings.baseApiUrl}${path}`, {headers: this.createHeaders()});
  }
}