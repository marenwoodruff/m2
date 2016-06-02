import {EventEmitter, Component, OnInit, OnDestroy, Input} from '@angular/core';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from '@angular/common';
import {Button, List, Item, TextInput, Label, NavController} from 'ionic-angular';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user/user';
import {UserPasswordChange} from '../../models/user/userPasswordChange';
import {UserSettingsPage} from '../../pages/user-settings/user-settings.page';
import {LoginPage} from '../../pages/login/login.page';
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
  private successMessage: string;
  private userSubscription: EventEmitter<User>;
  private errorSubscription: EventEmitter<any>;
  private passwordForm: ControlGroup;
  private passwordGroup: ControlGroup;
  private userId: number;

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
    this.initializeUser();
    this.userSubscription = this._userService.user.subscribe(
        (user) => {
          this.updatingPassword = false;
          console.log(user);
          this.successMessage = "Password updated!";
          this.errorMessage = null;
          // this._navController.setRoot(UserSettingsPage);
        }
      )
    this.errorSubscription = this._userService.changePasswordError.subscribe(
      (error) => {
        console.log(error);
        this.updatingPassword = false;
        this.successMessage = null;
        if (error.message){
          this.errorMessage = error.message;
        } else {
          this.errorMessage = "An error has occured please try again later";
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
      let userPasswordChange = new UserPasswordChange();
      userPasswordChange.oldPassword = this.passwordForm.value.oldPassword;
      userPasswordChange.newPassword = this.passwordForm.value.matchingPassword.password;
      this._userService.changePassword(this.userId, userPasswordChange);
    }
  }

  private initializeUser():void {
    const userId = this._userService.getUserId();
    if (!userId) {
      this._navController.setRoot(LoginPage);
    } else {
      this.userId = userId;
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
