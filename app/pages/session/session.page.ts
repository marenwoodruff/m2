import {Page} from 'ionic-angular';
import {Session} from '../../models/events/session';
import {Location} from '../../models/events/location';
import {NavParams} from 'ionic-angular';
import {SessionComponent} from '../../components/session/session.component';
import {DateFormatPipe} from 'angular2-moment';

@Page({
    templateUrl: 'build/pages/session/session.page.html',
    directives: [SessionComponent],
    pipes: [DateFormatPipe]
})

export class SessionPage {
  params: NavParams;
  session: Session;
  location: Location;

  constructor(navParams: NavParams) {
    this.params = navParams;
    this.session = this.params.get('session');
    this.location = this.params.get('location');
  }
}
