import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, RequestOptions, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TwitterFeed} from '../models/twitter/twitter';
import {AuthorizedUser} from '../models/user/authorizedUser';
import {AuthorizeUser} from '../models/user/authorizeUser';
import {AuthorizationService} from './authorization.service';
import 'rxjs/Rx';

@Injectable()
export class TwitterService {
    messagesRef: Firebase;
    isLoggedIn: boolean;
    authData: any;
    authDataProfileName: string;
    authDataProfileImage: string;
    authDataProfileDescription: string;
    authDataProfileMemberSince: string;
    authDataProfileNoFollowers: Number;
    authDataProfileLocation: string;
    userLogin: AuthorizeUser;
    private _api:Http;
    feed:EventEmitter<TwitterFeed[]> = new EventEmitter<TwitterFeed[]> ();
    bearerToken:EventEmitter<any> = new EventEmitter();
    twitterCredentials:EventEmitter<any> = new EventEmitter();
    firebaseUrl: string;

    constructor(private http: Http, private _authApi: AuthorizationService) {
      this.firebaseUrl = "https://mymatrix.firebaseio.com/messages";
      this.messagesRef = new Firebase(this.firebaseUrl);
      this._api = http;
    }

    auth() {
      this.messagesRef.authWithOAuthPopup("twitter", (error, authdata) => {
        if (error) {
          console.log(error);
        } else {
          this.userLogin = {
              name: authdata.twitter.displayName,
              company: null,
              jobTitle: null,
              email: null,
              authenticationProviderId: '2',
              authenticationId: authdata.uid,
              authenticationProvider: null,
              id: null,
              admin: false,
              password: '',
              phone: ''
            };
          this._authApi.authorizeUser(this.userLogin);
        }
      }, { remember: "sessionOnly" });
      console.log(this.authDataProfileName)
    }
}
