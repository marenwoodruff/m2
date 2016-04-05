import {Page} from 'ionic-angular';
import {SessionRegistrationPage} from '../../components/session-registration/session-registration.component';

@Page({
  templateUrl: 'build/pages/registration/registration.page.html',
  directives: [SessionRegistrationPage]
})
export class RegistrationPage { }
