import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import { Inject } from 'angular2/core';
import {Http} from 'angular2/http';
import {Button, List, Item, TextInput, Label, Platform} from 'ionic-angular';

@Component({
  selector: 'login',
  templateUrl: 'build/components/login/login.component.html',
  directives: [Button, List, Item, TextInput, Label]
})

export class LoginComponent {
  linkedInCode: String;
  linkedInState: String;
  twitterCode: String;
  twitterState: String;
  http: Http;

  constructor(private platform: Platform, @Inject(Http) http: Http) {
    this.http = http;
  }

  login(media) {
    this.platform.ready().then(() => {
      if (media === 'LinkedIn') {
        this.linkedInLogin().then((success) => {
          this.linkedInCode = success.code;
          this.linkedInState = success.state;
        }, (error) => {
          alert(error);
        });
      }
      if (media === 'Twitter') {
        this.twitterLogin().then((success) => {
          this.twitterCode = success.code;
          this.twitterState = success.state;
        }, (error) => {
          alert(error);
        });
      }
    });

  }

    linkedInLogin() {
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
        setTimeout(function() {
          console.log(browserRef.location.pathname, '==========');
        }, 3000);

      });
    }

    twitterLogin() {
      const encodedAccessKey = 'CWNkbHZKMkU0cEY2RzdSWE5KM0pnMGlqeTk6ek1oaUd0V2NyeXFhQVhTZFp3eUNhYWhtOW1nUnFxWGtTWTBCUDg1em5jc3pGdWxISTQNCg==';
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
        setTimeout(function() {
          console.log(browserRef.location.pathname, '==========');
        }, 3000);

      });
    }
}
