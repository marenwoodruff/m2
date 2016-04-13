import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Headers, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class LinkedInService {
  messagesRef: Firebase; // Initialized Firebase object
  isLoggedIn: boolean;   // Was authentification sucesfull
  authData: any;         // Object that holds Twitter authentification data (displayName, imageURL, etc.)
  private _api: Http;
  bearerToken: EventEmitter<any> = new EventEmitter();
  linkedInCredentials: EventEmitter<any> = new EventEmitter();
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
    this.stepOne().then((success) => {
      this._api.post('https://www.linkedin.com/uas/oauth2/accessToken', 'grant_type=authorization_code&code=' + success.code + '&redirect_uri=https%3A%2F%2Fwww.myapp.com%2Fauth%2Flinkedin&client_id=123456789&client_secret=shhdonottell')
        .map(res => <any>res.json())
        .subscribe(
        credentials => this.linkedInCredentials = credentials,
        err => console.log('this is the error', err),
        () => console.log('Bearer Token retrieval is completed'));
      this.linkedInCredentials.emit(this.linkedInCredentials);
    });
  }
  stepOne() {
    return new Promise(function(resolve, reject) {
      var browserRef = cordova.InAppBrowser.open("https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77afy8frauu9vo&redirect_uri=http://localhost:8100&state=51e48176-4b06-48d4-884b-9a3d643ee7d1&scope=r_basicprofile", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");

      browserRef.addEventListener('loadstart', (event) => {
        if ((event.url).indexOf("http://localhost:8100") === 0) {
          browserRef.removeEventListener("exit", (event) => { });
          browserRef.close();
          var responseParameters = ((event.url).split("?")[1]).split("&");
          var parsedResponse = {
            code: undefined,
            state: null,
          };
          for (var i = 0; i < responseParameters.length; i++) {
            parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
          }
          console.log(parsedResponse);
          if (parsedResponse.code !== undefined && parsedResponse.code !== null) {
            resolve(parsedResponse);
          } else {
            reject("Problem authenticating with LinkedIn");
          }
        }
      });
      browserRef.addEventListener("exit", function(event) {
        reject("The LinkedIn sign in flow was canceled");
      });
    });
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
