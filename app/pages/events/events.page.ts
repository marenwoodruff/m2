/**
 * Created by Abbey on 3/10/2016.
 */
import {Page} from 'ionic-angular';
import {EventsComponent} from '../../components/events/events.component';

@Page({
    templateUrl: 'build/pages/events/events.page.html',
    directives: [EventsComponent]
})
export class EventsPage { }
