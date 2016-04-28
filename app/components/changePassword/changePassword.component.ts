import {EventEmitter, Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Button, List, Item, TextInput, Label, NavController} from 'ionic-angular';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user/user';
import {EventsPage} from '../../pages/events/events.page';
import {LoaderComponent} from '../loader/loader.component';
import {ValidationService} from '../../service/validation.service';


@Component({
  selector: 'changePassword',
  templateUrl: 'build/components/changePassword/changePassword.component.html',
  directives: [Button, List, Item, TextInput, Label, LoaderComponent]
})
export class ChangePasswordComponent{
  private updatingPassword: boolean;
  private errorMessage: string;
  private userSubscription: EventEmitter<User>;
  private errorSubscription: EventEmitter<any>;
  private passwordForm: ControlGroup;

  constructor(
    private _userService: UserService,
    private _navController: NavController,
    private _formBuilder: FormBuilder) {
      this.passwordForm = this._formBuilder.group({
        'oldPassword': ['', Validators.required],
        'newPassword': ['', Validators.required],
        'confirmNewPassword': ['', Validators.required],
      })
  }

  ngOnInit(): any {
    this.userSubscription = this._userService.user.subscribe(
        (user) => {
          this.updatingPassword = false;
          console.log(user);
          // this._navController.setRoot(EventsPage);
        }
      )
    this.errorSubscription = this._userService.error.subscribe(
      (error) => {
        console.log(error);
        this.updatingPassword = false;
        if (error.message){
          this.errorMessage = error.message;
        }
      }
    )
  }

  ngOnDestroy():any {
    this.userSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  private changePassword():void{

  }


}
