import {App, IonicApp, Platform, NavController, Icon, MenuController} from 'ionic-angular';
import {forwardRef, OnInit, EventEmitter} from 'angular2/core';
import {SurveysPage} from './pages/surveys/surveys.page';
import {SurveyService} from './service/survey.service';
import {StorageService} from './service/storage.service';
import {EventsPage} from './pages/events/events.page';
import {EventService} from './service/event.service';
import {LoginPage} from './pages/login/login.page';
import {LogoutPage} from './pages/logout/logout.page';
import {SignupPage} from './pages/signup/signup.page';
import {ContactPage} from './pages/contact/contact.page';
import {UserSettingsPage} from './pages/user-settings/user-settings.page';
import {RegistrationPage} from './pages/registration/registration.page';
import {AuthorizationService} from './service/authorization.service';
import {UserService} from './service/user.service';
import {HttpClient} from './service/http-client.service';
import {UserEventsPage} from './pages/user-events/user-events.page';
import {UserEventService} from './service/userEvent.service';
import {SupportPage} from './pages/support/support.page';
import {User} from './models/user/user';

@App({
    templateUrl: 'build/app.html',
    providers: [SurveyService, StorageService, AuthorizationService, UserService, HttpClient, EventService, UserEventService],
    directives: [Icon],
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp implements OnInit{
    rootPage: any = LoginPage;
    pages:Array<{title: string, component: any}>;
    nav:NavController;
    userName: string;
    userSubscription: EventEmitter<User>;

    constructor(
      private app:IonicApp,
      private platform:Platform,
      private storageService:StorageService,
      public surveyService:SurveyService,
      private userService:UserService,
      private userEventService:UserEventService,
      private menuController: MenuController) {}

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
            {title: 'Contact Us', component: ContactPage},
            {title: 'User Settings', component: UserSettingsPage},
            {title: 'Support', component: SupportPage},
            {title: 'Logout', component: LogoutPage}
        ];
    }

    private initializeApp() {
        this.platform.ready().then(() => {
            var nav:NavController = this.app.getComponent("nav");
            this.nav = nav;
            this.hasLoggedIn((loggedIn) => {
        		  if (loggedIn === true) {
                      this.userInfo();
                      this.menuController.enable(true);
                      this.setInitialPage(EventsPage);
    		      }
    	     });
        });
    }

    private setInitialPage(page) {
        this.nav.setRoot(page);
    }

    private openPage(page) {
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }

    private hasLoggedIn(cb) {
      var loggedIn = this.userService.isUserLoggedIn();
      return cb(loggedIn)
    }

    private userInfo() {
      let userId = this.userService.getUserId();
      this.userService.getUser(userId);
    }
}
