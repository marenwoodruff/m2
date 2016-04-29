import {EventEmitter, Component, OnInit, OnDestroy, Input, Inject} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {TwitterService} from '../../service/twitter.service';
import {LinkedInService} from '../../service/linkedin.service';
import {UserService} from '../../service/user.service';
import {AuthorizationService} from '../../service/authorization.service';
import {Http} from 'angular2/http';
import {Button, List, Item, TextInput, Label, Platform, NavController, MenuController} from 'ionic-angular';
import {SignupEmailPage} from '../../pages/signupEmail/signupEmail.page';
import {EventsPage} from '../../pages/events/events.page';
import {User} from '../../models/user/user';
import {UserLogin} from '../../models/user/userLogin';
import {LoaderComponent} from '../loader/loader.component';
import {ControlMessageComponent} from '../controlMessage/controlMessage.component';
import {ValidationService} from '../../service/validation.service';


@Component({
  selector: 'login',
  templateUrl: 'build/components/login/login.component.html',
  directives: [Button, List, Item, TextInput, Label, LoaderComponent, ControlMessageComponent],
  providers: [TwitterService, LinkedInService]
})

export class LoginComponent implements OnInit, OnDestroy {
  linkedInCredentials: any;
  access_token: any;
  twitterCredentials: any;
  private userForm: ControlGroup;
  private loggingIn: boolean;
  private errorMessage: string;
  private twitterSubscription: EventEmitter<any>;
  private linkedInSubscription: EventEmitter<any>;
  private userSubscription: EventEmitter<User>;
  private errorSubscription: EventEmitter<any>;

  constructor(
    private platform: Platform,
    private _twitterApi: TwitterService,
    private _linkedInApi: LinkedInService,
    private _userService: UserService,
    private _authService:AuthorizationService,
    private _navController: NavController,
    private _menuController: MenuController,
    private _formBuilder: FormBuilder) {
    this.twitterCredentials = { access_token: null };
    this.userForm = this._formBuilder.group({
      'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      'password': ['', Validators.required]
    })
  }

  ngOnInit(): any {
    this._menuController.enable(false);
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
          this._navController.setRoot(EventsPage);
        }
      )
      this.errorSubscription = this._authService.loginUserError.subscribe(
        (error) => {
          console.log(error);
          this.loggingIn = false;
          if (error.message){
            this.errorMessage = error.message;
          }
        }
      )
  }

  ngOnDestroy() {
      this.twitterSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
      this.errorSubscription.unsubscribe();
  }

  private login(media) {
    this.platform.ready().then(() => {
      if (media === 'LinkedIn') {
        this.linkedInLogin()
      }
      if (media === 'Twitter') {
        this.twitterLogin();
      }
      if (media === 'Email') {
        this.emailLogin();
      }
      this._menuController.enable(true);
    });
  }

  private linkedInLogin() {
    this._linkedInApi.auth();
  }

  private twitterLogin() {
    this._twitterApi.auth();
  }

  private emailLogin() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.loggingIn = true;
      const userLogin = new UserLogin();
      userLogin.email = this.userForm.value.email;
      userLogin.password = this.userForm.value.password;
      this._authService.loginUserWithEmail(userLogin);
    }
  }

  private emailSignup() {
    this._navController.push(SignupEmailPage);
  }

}
