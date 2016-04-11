import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {Button, List, Item, TextInput, Label, Platform} from 'ionic-angular';

@Component({
  selector: 'login',
  templateUrl: 'build/components/login/login.component.html',
  directives: [Button, List, Item, TextInput, Label]
})

export class LoginComponent {

  constructor(private platform: Platform) {
  }

  launch(url) {
    this.platform.ready().then(() => {
      // alert('just to see if the... um... just to see if its even...');
      cordova.InAppBrowser.open(url, "_system", "location=true");
    });
  }

  login() {
    this.launch("https://google.com")
    // this.platform.ready().then(() => {


    //   // this.linkedInLogin().then((success) => {
    //   //   // alert(success.access_token);
    //   // }, (error) => {
    //   //   alert(error);
    //   // });
    // });

  }

  // linkedInLogin() {
  //   return new Promise(function(resolve, reject) {
  //     var browserRef = cordova.InAppBrowser.open("https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77afy8frauu9vo&redirect_uri=http://localhost:8100&state=51e48176-4b06-48d4-884b-9a3d643ee7d1&scope=r_basicprofile");
  //     browserRef.addEventListener('loadstop', (event) => {
  //       if ((event.url).indexOf("http://localhost:8100") === 0) {
  //         browserRef.removeEventListener("exit", (event) => { });
  //         browserRef.close();
  //         var responseParameters = ((event.url).split("#")[1]).split("&");
  //         var parsedResponse = {};
  //         for (var i = 0; i < responseParameters.length; i++) {
  //           parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
  //         }
  //         if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
  //           resolve(parsedResponse);
  //         } else {
  //           reject("Problem authenticating with LinkedIn");
  //         }
  //       }
  //     });
  //     browserRef.addEventListener("exit", function(event) {
  //       reject("The LinkedIn sign in flow was canceled");
  //     });
  //   });
  // }
}
