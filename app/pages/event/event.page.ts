import {Page} from 'ionic-angular';
import {EventComponent} from '../../modules/components/event/event.component';

@Page({
    templateUrl: 'build/pages/events/events.page.html',
    directives: [EventComponent]
})
export class EventPage { }
