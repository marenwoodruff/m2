import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Headers, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {AuthorizedUser} from '../models/user/authorizedUser';
import {AuthorizeUser} from '../models/user/authorizeUser';
import {AuthorizationService} from './authorization.service';

@Injectable()
export class LinkedInService {
  isLoggedIn: boolean;
  authData: any;
  bearerToken: EventEmitter<any> = new EventEmitter();
  linkedInCredentialsEmitter: EventEmitter<any> = new EventEmitter();
  linkedInCredentials: any;
  userLogin: AuthorizeUser;

  constructor(private _api: Http, private _authApi: AuthorizationService) { }

  auth() {
    this.stepOne().then((success:any) => {

      let headers = new Headers(),
        body = 'grant_type=authorization_code&code=' + success.code + '&redirect_uri=http://10.55.254.92:8100&client_id=77afy8frauu9vo&client_secret=AQsInIAAqrwqQjy5';
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this._api.post('https://www.linkedin.com/uas/oauth2/accessToken', body, { headers: headers })
        .map((res) => {
        return res.json();
      })
        .subscribe(
        (credentials) => {
          this.linkedInCredentials = credentials;
          this.getUserProfile(this.linkedInCredentials.access_token);
        },
        (err) => {
          console.log(err);
        },
        () => console.log('Bearer Token retrieval is completed'));
    });
  }
  stepOne() {
    return new Promise(function(resolve, reject) {
      var browserRef = cordova.InAppBrowser.open("https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77afy8frauu9vo&redirect_uri=http://10.55.254.92:8100&state=51e48176-4b06-48d4-884b-9a3d643ee7d1&scope=r_basicprofile,r_emailaddress", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");

      browserRef.addEventListener('loadstart', (event) => {
        if ((event.url).indexOf("http://10.55.254.92:8100") === 0) {
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

  getUserProfile(access_token: string) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + access_token);
    this._api.get("https://api.linkedin.com/v1/people/~:(id,email-address,first-name,last-name,headline,positions)?format=json", { headers })
      .subscribe(
      (res) => {
        console.log('user', res);
        let userObject = res.json();
        this.userLogin = {
          name: userObject.firstName + ' ' + userObject.lastName,
          company: userObject.positions.values[0].company.name,
          jobTitle: userObject.positions.values[0].title,
          email: userObject.emailAddress,
          authenticationProviderId: '1',
          authenticationId: userObject.id,
          id: null,
          phone: '',
          password: '',
          admin: false,
          authenticationProvider: null,
        };
        this._authApi.authorizeUser(this.userLogin);
        this.linkedInCredentialsEmitter.emit(userObject);
      }
      );
  }
}
