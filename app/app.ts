import {App, IonicApp, Platform} from 'ionic-angular';
import {FORM_PROVIDERS} from 'angular2/common';
import {SurveysPage} from './pages/surveys/surveys.page';
import {SurveyService} from './service/survey.service';
import {EventsPage} from './pages/events/events.page';
import {TwitterPage} from './pages/twitter/twitter.page';
import {EventService} from "./service/event.service";
import {Storage, SqlStorage} from 'ionic-angular';
import {LoginPage} from './pages/login/login.page';

@App({
    templateUrl: 'build/app.html',
    providers: [FORM_PROVIDERS, SurveyService],
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
    rootPage:any = EventsPage;
    pages:Array<{title: string, component: any}>;
    private storage: Storage;

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
          this.storage = new Storage(SqlStorage, {name: 'SurveyResponse'});
          this.storage.query('CREATE TABLE IF NOT EXISTS SurveyResponse (id INTEGER PRIMARY KEY AUTOINCREMENT, surveyId TEXT, responses TEXT)')
            .then((data) => {
              console.log("TABLE CREATED -> " + JSON.stringify(data.res));
            }, (error) => {
              console.log("ERROR -> " + JSON.stringify(error.err));
            });
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }
}
