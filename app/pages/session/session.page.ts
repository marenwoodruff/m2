import {Page} from 'ionic-angular';
import {Session} from '../../models/events/session';
import {SessionComponent} from '../../components/session/session.component';
import {NavParams} from 'ionic-angular';
@Page({
    templateUrl: 'build/pages/session/session.page.html',
    directives: [SessionComponent]
})
export class SessionPage {
  params: NavParams;
  session: Session;
  constructor(navParams: NavParams) {
    this.params = navParams;
    this.session = this.params.get('session');
  }
}
