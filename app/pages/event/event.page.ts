import {Component, forwardRef} from '@angular/core';
import {NavParams, Nav, Platform} from 'ionic-angular';
import {EventComponent} from '../../components/event/event.component';
import {SurveysComponent} from '../../components/surveys/surveys.component';
import {SessionsComponent} from '../../components/sessions/sessions.component';
import {Survey} from '../../models/survey/survey';
import {Event} from '../../models/Events/event';

@Component({
    templateUrl: 'build/pages/event/event.page.html',
    directives: [EventComponent, forwardRef(() => SurveysComponent), SessionsComponent]
})
export class EventPage {
    event: Event;
    currentLocation: Array<number>;
    public surveys: Survey[];

    constructor(private params: NavParams, private platform: Platform, private nav: Nav) {
        this.nav.swipeBackEnabled = false;
        this.params = params;
        this.platform = platform;
        this.event = this.params.get('event');
        this.currentLocation = this.params.get('location');
    }

    private share(message:string, subject:string, file:string, link:string):void {
        link = `http://matrixres.com${link}`;
        this.platform.ready().then(() => {
            if (window.plugins.socialsharing) {
                window.plugins.socialsharing.share(message, subject, file, link);
            }
        });
    }
}