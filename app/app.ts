import {App, IonicApp, Platform} from 'ionic-angular';
import {SurveysPage} from './pages/surveys/surveys.page';
import {SurveyService} from './service/survey.service';
import {StorageService} from './service/storage.service';
import {EventsPage} from './pages/events/events.page';
import {TwitterPage} from './pages/twitter/twitter.page';
import {EventService} from "./service/event.service";
import {LoginPage} from './pages/login/login.page';

@App({
    templateUrl: 'build/app.html',
    providers: [SurveyService, StorageService],
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
    rootPage:any = EventsPage;
    pages:Array<{title: string, component: any}>;

    constructor(private app:IonicApp, private platform:Platform, private storageService:StorageService) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'My Matrix', component: EventsPage},
            {title: 'Surveys', component: SurveysPage},
            {title: 'Twitter', component: TwitterPage},
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {

        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }
}
