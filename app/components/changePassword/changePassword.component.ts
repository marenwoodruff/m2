import {EventEmitter, Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Button, List, Item, TextInput, Label, NavController} from 'ionic-angular';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user/user';
import {EventsPage} from '../../pages/events/events.page';
import {LoaderComponent} from '../loader/loader.component';
import {ValidationService} from '../../service/validation.service';
import {ControlMessageComponent} from '../controlMessage/controlMessage.component';

@Component({
  selector: 'changePassword',
  templateUrl: 'build/components/changePassword/changePassword.component.html',
  directives: [Button, List, Item, TextInput, Label, LoaderComponent, ControlMessageComponent]
})
export class ChangePasswordComponent{
  private updatingPassword: boolean;
  private errorMessage: string;
  private userSubscription: EventEmitter<User>;
  private errorSubscription: EventEmitter<any>;
  private passwordForm: ControlGroup;
  private passwordGroup: ControlGroup;
  constructor(
    private _userService: UserService,
    private _navController: NavController,
    private _formBuilder: FormBuilder) {
      this.passwordForm = this._formBuilder.group({
        'oldPassword': ['', Validators.required],
        matchingPassword: this._formBuilder.group({
          password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
          confirmPassword: ['', Validators.compose([Validators.required])]
        }, {validator: this.checkPasswords})
      });
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
    this.updatingPassword = true;
    if (this.passwordForm.dirty && this.passwordForm.valid){
      console.log("change password");
    }
  }

  private checkPasswords(group):any {
    let password = group.controls.password;
    let confirm = group.controls.confirmPassword;

    if (password.pristine || confirm.pristine) {
      return null;
    }
    group.markAsTouched();

    if (password.value === confirm.value) {
      return null;
    }

    return {
      isValid: false
    };
  }

}
