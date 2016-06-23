import {IonicApp, App, Platform, Nav, Icon, MenuController, Alert} from 'ionic-angular';
import {forwardRef, OnInit, EventEmitter, ViewChild, DoCheck} from '@angular/core';
import {SurveysPage} from './pages/surveys/surveys.page';
import {SurveyService} from './service/survey.service';
import {StorageService} from './service/storage.service';
import {EventsPage} from './pages/events/events.page';
import {EventService} from './service/event.service';
import {LoginPage} from './pages/login/login.page';
import {LogoutPage} from './pages/logout/logout.page';
import {UserSettingsPage} from './pages/user-settings/user-settings.page';
import {RegistrationPage} from './pages/registration/registration.page';
import {AuthorizationService} from './service/authorization.service';
import {UserService} from './service/user.service';
import {HttpClient} from './service/http-client.service';
import {UserEventsPage} from './pages/user-events/user-events.page';
import {UserEventService} from './service/userEvent.service';
import {SupportPage} from './pages/support/support.page';
import {User} from './models/user/user';
import {StatusBar} from 'ionic-native';

@App({
    templateUrl: 'build/app.html',
    providers: [SurveyService, StorageService, AuthorizationService, UserService, HttpClient, EventService, UserEventService, StatusBar],
    directives: [Icon],
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp implements OnInit, DoCheck{
    rootPage: any = this.userService.isUserLoggedIn() ? EventsPage : LoginPage;
    pages:Array<{title: string, component: any}>;
    @ViewChild(Nav) nav: Nav;
    userName: string;
    userSubscription: EventEmitter<User>;

    constructor(
      private app:IonicApp,
      private platform:Platform,
      private storageService:StorageService,
      public surveyService:SurveyService,
      private userService:UserService,
      private userEventService:UserEventService,
      private menuController:MenuController,
      private statusBar:StatusBar) {}

    ngOnInit(){
        this.userSubscription = this.userService.user.subscribe(
          user => this.userName = user.name.split(' ')[0],
          err => console.log(err),
          () => console.log('we has user name')
        )
        this.initializeApp();
        this.pages = [
            {title: 'MATRIX Calendar', component: EventsPage},
            {title: 'My MATRIX', component: UserEventsPage},
            {title: 'Surveys', component: SurveysPage},
            {title: 'User Settings', component: UserSettingsPage},
            {title: 'Support', component: SupportPage},
            {title: 'Logout', component: LogoutPage}
        ];
    }

    ngDoCheck() {
        const activeView = this.nav.getActive()
        if (activeView) {
            if (activeView.componentType === LoginPage) {
                this.statusBar.styleDefault();
            } else {
                this.statusBar.styleLightContent();
            }
        }
    }

    private initializeApp() {
        this.platform.ready().then(() => {
            this.hasLoggedIn((loggedIn) => {
              if (loggedIn === true) {
                      this.userInfo();
                      // this.menuController.enable(true);
                      // this.setInitialPage(EventsPage);
                      this.userName = this.userService.getUserFromLocalStorage().name.split(' ')[0];
              }
           });
        });
    }

    private setInitialPage(page) {
        this.nav.setRoot(page);
    }

    private openPage(page) {
      this.hasLoggedIn((loggedIn) => {
        if (loggedIn === true) {
          const pageComponent = page.component;
          this.nav.setRoot(pageComponent)
            .then(() => {
                const menuButtons:any = document.querySelectorAll('button[menuToggle]');
                menuButtons.forEach((button) => {
                    button.setAttribute('ng-reflect-hidden', 'false');
                    button.hidden = false;
                });
            });
        } else {
          this.loggedOutAlert();
        }
      });
    }

    private hasLoggedIn(cb) {
      var loggedIn = this.userService.isUserLoggedIn();
      return cb(loggedIn)
    }

    private userInfo() {
      let userId = this.userService.getUserId();
      this.userService.getUser(userId);
    }

    private loggedOutAlert():void {
      let confirm = Alert.create({
        title: 'You are not logged in.',
        message: 'Please login with your user information to view this page.',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              this.nav.setRoot(LoginPage);
            }
          }
        ]
      });
      this.nav.present(confirm);
    }
}
