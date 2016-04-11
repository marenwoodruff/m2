import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {Button, List, Item, TextInput, Label, Platform} from 'ionic-angular';

@Component({
  selector: 'login',
  templateUrl: 'build/components/login/login.component.html',
  directives: [Button, List, Item, TextInput, Label]
})

export class LoginComponent {
  code: String;
  state: String;

  constructor(private platform: Platform) {
  }

  login() {
    this.platform.ready().then(() => {
      this.linkedInLogin().then((success) => {
        this.code = success.code;
        this.state = success.state;
      }, (error) => {
        alert(error);
      });
    });

  }

    linkedInLogin() {
      return new Promise(function(resolve, reject) {
        var browserRef = window.open("https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77afy8frauu9vo&redirect_uri=http://localhost:8100&state=51e48176-4b06-48d4-884b-9a3d643ee7d1&scope=r_basicprofile", "_system", "location=true");

        browserRef.addEventListener('loadstop', (event) => {
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
        // var browserRef = cordova.InAppBrowser.open("https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77afy8frauu9vo&redirect_uri=http://localhost:8100&state=51e48176-4b06-48d4-884b-9a3d643ee7d1&scope=r_basicprofile", "_system", "location=true");

        // browserRef.addEventListener('loadstop', (event) => {
        //   if ((event.url).indexOf("http://localhost:8100") === 0) {
        //     browserRef.removeEventListener("exit", (event) => { });
        //     browserRef.close();
        //     var responseParameters = ((event.url).split("#")[1]).split("&");
        //     var parsedResponse = {};
        //     for (var i = 0; i < responseParameters.length; i++) {
        //       parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
        //     }
        //     if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
        //       resolve(parsedResponse);
        //     } else {
        //       reject("Problem authenticating with LinkedIn");
        //     }
        //   }
        // });
        // browserRef.addEventListener("exit", function(event) {
        //   reject("The LinkedIn sign in flow was canceled");
        // });
      });
    }
}
