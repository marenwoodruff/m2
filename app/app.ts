import {Component, forwardRef, OnInit, EventEmitter, ViewChild} from '@angular/core';
import {ionicBootstrap, App, Platform, Nav, Icon, MenuController, Alert} from 'ionic-angular';
import {SurveysPage} from './pages/surveys/surveys.page';
import {SurveyService} from './service/survey.service';
import {StorageService} from './service/storage.service';
import {EventsPage} from './pages/events/events.page';
import {EventService} from './service/event.service';
import {LoginPage} from './pages/login/login.page';
import {LogoutPage} from './pages/logout/logout.page';
import {SignupPage} from './pages/signup/signup.page';
import {UserSettingsPage} from './pages/user-settings/user-settings.page';
import {RegistrationPage} from './pages/registration/registration.page';
import {AuthorizationService} from './service/authorization.service';
import {UserService} from './service/user.service';
import {HttpClient} from './service/http-client.service';
import {UserEventsPage} from './pages/user-events/user-events.page';
import {UserEventService} from './service/userEvent.service';
import {SupportPage} from './pages/support/support.page';
import {User} from './models/user/user';

@Component({
    templateUrl: 'build/app.html',
    directives: [Icon]
})
class MyApp implements OnInit{
    rootPage: any = this.userService.isUserLoggedIn() ? EventsPage : LoginPage;
    pages:Array<{title: string, component: any}>;
    @ViewChild(Nav) nav: Nav;
    userName: string;
    userSubscription: EventEmitter<User>;

    constructor(
        private app:App,
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
            {title: 'User Settings', component: UserSettingsPage},
            {title: 'Support', component: SupportPage},
            {title: 'Logout', component: LogoutPage}
        ];
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
            this.nav.setRoot(page.component);
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
ionicBootstrap(MyApp, [SurveyService, StorageService, AuthorizationService, UserService, HttpClient, EventService, UserEventService], {});
