import {EventEmitter, Component, OnInit, OnDestroy, Input} from 'angular2/core';
import { Inject } from 'angular2/core';
import {TwitterService} from '../../service/twitter.service';
import {LinkedInService} from '../../service/linkedin.service';
import {Http} from 'angular2/http';
import {Button, List, Item, TextInput, Label, Platform} from 'ionic-angular';

@Component({
  selector: 'login',
  templateUrl: 'build/components/login/login.component.html',
  directives: [Button, List, Item, TextInput, Label],
  providers: [TwitterService, LinkedInService]
})

export class LoginComponent implements OnInit, OnDestroy {
  linkedInCredentials: any;
  access_token: any;
  twitterCredentials: any;
  private twitterSubscription: EventEmitter<any>;
  private linkedInSubscription: EventEmitter<any>;

  http: Http;

  constructor(private platform: Platform, http: Http, private _twitterApi: TwitterService, private _linkedInApi: LinkedInService) {
    this.http = http;
    this.twitterCredentials = { access_token: null };
  }



  login(media) {
    this.platform.ready().then(() => {
      if (media === 'LinkedIn') {
        this.linkedInLogin()
      }
      if (media === 'Twitter') {
        this.twitterLogin();
      }
    });
  }

    linkedInLogin() {
      this._linkedInApi.auth();
    }

    twitterLogin() {
      this._twitterApi.auth();
    }

    ngOnInit(): any {
      this.twitterSubscription = this._twitterApi.twitterCredentials.subscribe(
        (twitterCredentials) => {
          console.log("seymour butts twitter", twitterCredentials);
          this.twitterCredentials = twitterCredentials;
        },
        err => console.log('twitterService subscribe error:', err),
        () => {
          console.log('finished subscribing to twitter service')
        }
      );
      this.linkedInSubscription = this._linkedInApi.linkedInCredentialsEmitter.subscribe(
        (linkedInCredentials) => {
          this.access_token = linkedInCredentials.access_token;
          // this.linkedInCredentials = linkedInCredentials;
          // this.access_token = linkedInCredentials.access_token;
          // alert(this.access_token);
        },
        err => console.log('LinkedIn Service subscribe error:', err),
        () => {
          console.log('finished subscribing to LinkedIn service')
        }
      );
    }

    ngOnDestroy() {
      this.twitterSubscription.unsubscribe();
    }
}
