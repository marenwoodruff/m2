import {Page} from 'ionic-angular';
import {EventComponent} from '../../modules/components/event/event.component';
import {NavParams} from 'ionic-angular';
@Page({
    templateUrl: 'build/pages/event/event.page.html',
    directives: [EventComponent]
})
export class EventPage {
  params: NavParams;
  event: Event;
  page: string = "overview";

  constructor(navParams: NavParams) {
    this.params = navParams;
    this.event = this.params.get('event');
  }
}
