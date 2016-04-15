import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Headers, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {TwitterFeed} from '../models/twitter/twitter';
import 'rxjs/Rx';

@Injectable()
export class TwitterService {
    messagesRef: Firebase; // Initialized Firebase object
    isLoggedIn: boolean;   // Was authentification sucesfull
    authData: any;         // Object that holds Twitter authentification data (displayName, imageURL, etc.)
    authDataProfileName: string;        // Profile name
    authDataProfileImage: string;       // Profile image
    authDataProfileDescription: string; // Profile description
    authDataProfileMemberSince: string; // Member since
    authDataProfileNoFollowers: Number;    // Number of followers
    authDataProfileLocation: string;
    private _api:Http;
    feed:EventEmitter<TwitterFeed[]> = new EventEmitter();
    bearerToken:EventEmitter<any> = new EventEmitter();
    twitterCredentials:EventEmitter<any> = new EventEmitter();
    firebaseUrl: String;

    constructor(private http: Http) {
      this.firebaseUrl = "https://mymatrix.firebaseio.com/messages";
      this.messagesRef = new Firebase(this.firebaseUrl);
      this._api = http;
      // this.messagesRef.onAuth((user) => {
      //   if (user) {
      //     this.authData = user;
      //     this.authDataProfileImage = this.authData.twitter.profileImageURL.replace(/\_normal/, "");
      //     this.authDataProfileName = this.authData.twitter.displayName;
      //     this.authDataProfileDescription = this.authData.twitter.cachedUserProfile.description;
      //     this.authDataProfileMemberSince = this.authData.twitter.cachedUserProfile.created_at;
      //     this.authDataProfileNoFollowers = this.authData.twitter.cachedUserProfile.followers_count;
      //     this.authDataProfileLocation = this.authData.twitter.cachedUserProfile.location;
      //     this.isLoggedIn = true;
      //   }
      // });
    }

    auth() {
      this.messagesRef.authWithOAuthPopup("twitter", (error, authdata) => {
        if (error) {
          console.log(error);
        } else {
          this.twitterCredentials.emit(authdata);
        }
      }, { remember: "sessionOnly" });
      console.log(this.authDataProfileName)
    }
}
