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
    // getBearer() {
    //   const encodedBearerTokenCredentials = 'CWNkbHZKMkU0cEY2RzdSWE5KM0pnMGlqeTk6ek1oaUd0V2NyeXFhQVhTZFp3eUNhYWhtOW1nUnFxWGtTWTBCUDg1em5jc3pGdWxISTQNCg==';
    //   let key = "cdlvJ2E4pF6G7RXNJ3Jg0ijy9";
    //   let secret = "zMhiGtWcryqaAXSdZwyCaahm9mgRqqXkSY0BP85zncszFulHI4";

    //   let bearerRequest = btoa(key + ':' + secret);
    //   let headers = new Headers();
    //   headers.append("Authorization", "Basic " + encodedBearerTokenCredentials);
    //   headers.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    //   console.log('headers', headers);

    // this._api.post('https://api.twitter.com/oauth2/token', "grant_type=client_credentials", {headers: headers})
    //     .map(res => <any>res.json())
    //     .subscribe(
    //       credentials => this.twitterCredentials = credentials,
    //       err => console.log('this is the error', err),
    //       () => console.log('Bearer Token retrieval is completed'));
    //       this.twitterCredentials.emit(this.twitterCredentials);
    // }
    // getMatrixFeed() {

    //   let headers = new Headers();
    //   headers.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAABWruAAAAAAAmYTQM0oq16eaD%2FKtouB6FzJmVRI%3Dc6vo5GlwjWZWEc27ALYnoBI2M1ETx0UvvSMo8T50iHTPiPcE4F");
    //   headers.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

    //   this._api.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=matrixresources', headers)
    //     .map(res => <TwitterFeed[]> res.json())
    //     .subscribe(
    //         matrixFeed =>this.feed.emit(matrixFeed),
    //         err => console.log(err),
    //         () => console.log('Matrix Twitter Feed retrieval is completed'));
    // }
}
