import {EventEmitter, Component, OnInit, OnDestroy, Input} from 'angular2/core';
import { Inject } from 'angular2/core';
import {TwitterService} from '../../service/twitter.service';
import {LinkedInService} from '../../service/linkedin.service';
import {UserService} from '../../service/user.service';
import {AuthorizationService} from '../../service/authorization.service';
import {Http} from 'angular2/http';
import {Button, List, Item, TextInput, Label, Platform, NavController} from 'ionic-angular';
import {SignupEmailPage} from '../../pages/signupEmail/signupEmail.page';
import {EventsPage} from '../../pages/events/events.page';
import {User} from '../../models/user/user';
import {UserLogin} from '../../models/user/userLogin';

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
  private userSubscription: EventEmitter<User>;
  private userLogin:UserLogin = new UserLogin();

  constructor(
    private platform: Platform,
    private _twitterApi: TwitterService,
    private _linkedInApi: LinkedInService,
    private _userService: UserService,
    private _authService:AuthorizationService,
    private _navController: NavController) {
    this.twitterCredentials = { access_token: null };
  }

  ngOnInit(): any {
    this.twitterSubscription = this._twitterApi.twitterCredentials.subscribe(
      (twitterCredentials) => {
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
      },
      err => console.log('LinkedIn Service subscribe error:', err),
      () => {
        console.log('finished subscribing to LinkedIn service')
      }
      );
      this.userSubscription = this._userService.user.subscribe(
        (user) => {
          console.log(user);
          this._navController.setRoot(EventsPage);
        }
      )
  }

  ngOnDestroy() {
      this.twitterSubscription.unsubscribe();
  }

  login(media) {
    this.platform.ready().then(() => {
      if (media === 'LinkedIn') {
        this.linkedInLogin()
      }
      if (media === 'Twitter') {
        this.twitterLogin();
      }
      if (media === 'Email') {
        this.emailLogin(this.userLogin);
      }
    });
  }

  private linkedInLogin() {
    this._linkedInApi.auth();
  }

  private twitterLogin() {
    this._twitterApi.auth();
  }

  private emailLogin(userLogin) {
    this._authService.loginUserWithEmail(userLogin);
  }

  private emailSignup() {
    this._navController.push(SignupEmailPage);
  }

}
