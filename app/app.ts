import {App, IonicApp, Platform} from 'ionic-angular';
import {SurveysPage} from './pages/surveys/surveys.page';
import {SurveyService} from './service/survey.service';
import {EventsPage} from './pages/events/events.page';
import {TwitterPage} from './pages/twitter/twitter.page';
import {EventService} from "./service/event.service";
import {LoginPage} from './pages/login/login.page';

@App({
    templateUrl: 'build/app.html',
    providers: [SurveyService],
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
    rootPage:any = EventsPage;
    pages:Array<{title: string, component: any}>;

    constructor(private app:IonicApp, private platform:Platform) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Surveys', component: SurveysPage},
            {title: 'Events', component: EventsPage},
            {title: 'Twitter', component: TwitterPage},
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // The platform is now ready. Note: if this callback fails to fire, follow
            // the Troubleshooting guide for a number of possible solutions:
            //
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //
            // First, let's hide the keyboard accessory bar (only works natively) since
            // that's a better default:
            //
            // Keyboard.setAccessoryBarVisible(false);
            //
            // For example, we might change the StatusBar color. This one below is
            // good for dark backgrounds and light text:
            // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }
}
