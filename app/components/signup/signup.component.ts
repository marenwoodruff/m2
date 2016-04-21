import {EventEmitter, Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {Button, List, Item, TextInput, Label, NavController} from 'ionic-angular';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user/user';
import {EventsPage} from '../../pages/events/events.page';
import {AuthorizationService} from '../../service/authorization.service';


@Component({
  selector: 'signup',
  templateUrl: 'build/components/signup/signup.component.html',
  directives: [Button, List, Item, TextInput, Label]
})

export class SignupComponent implements OnInit {
  private userSubscription: EventEmitter<User>;
  private user:User = new User();

  constructor(
    private _userService: UserService,
    private _navController: NavController,
    private _authService:AuthorizationService) {
  }

  ngOnInit(): any {
    this.userSubscription = this._userService.user.subscribe(
        (user) => {
          console.log(user);
          this._navController.setRoot(EventsPage);
        }
      )
  }

  signUp(){
    this._authService.createUser(this.user);
  }

}
