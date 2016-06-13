import {EventEmitter, Component, OnInit, OnDestroy, Input} from '@angular/core';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from '@angular/common';
import {Button, List, Item, TextInput, Label, Nav, Alert} from 'ionic-angular';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user/user';
import {ChangePasswordPage} from '../../pages/changePassword/changePassword.page';
import {LoginPage} from '../../pages/login/login.page';
import {LoaderComponent} from '../loader/loader.component';
import {ControlMessageComponent} from '../controlMessage/controlMessage.component';
import {ValidationService} from '../../service/validation.service';
import {AuthorizationService} from '../../service/authorization.service';


@Component({
  selector: 'user-settings',
  templateUrl: 'build/components/user-settings/user-settings.component.html',
  directives: [Button, List, Item, TextInput, Label, LoaderComponent, ControlMessageComponent]
})

export class UserSettingsComponent implements OnInit, OnDestroy {
  private updatingUser: boolean;
  private deletingUser: boolean;
  private errorMessage: string;
  private userSubscription: EventEmitter<User>;
  private userDeletedSubscription: EventEmitter<boolean>;
  private errorSubscription: EventEmitter<any>;
  private deleteUserErrorSubscription: EventEmitter<any>;
  private userForm: ControlGroup;
  private user: User;

  constructor(
    private _userService: UserService,
    private _navController: Nav,
    private _formBuilder: FormBuilder,
    private _authService: AuthorizationService) {
      this.userForm = this._formBuilder.group({
        'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
        'name': ['', Validators.required],
        'company': [''],
        'jobTitle': [''],
        'phone': ['', Validators.compose([ValidationService.phoneNumberValidator])]
      })
  }

  ngOnInit(): any {
    this.initializeUser();
    this.userSubscription = this._userService.user.subscribe(
        (user) => {
          this.updatingUser = false;
          console.log(user);
          // this._navController.setRoot(EventsPage);
        }
      );
    this.errorSubscription = this._userService.updateUserError.subscribe(
      (error) => {
        console.log(error);
        this.updatingUser = false;
        if (error.message){
          this.errorMessage = error.message;
        }
      }
    );
    this.userDeletedSubscription = this._userService.userDeletedSuccess.subscribe(
      (success) => {
        if (success) {
          this.userDeleted();
        }
      }
    );
    this.deleteUserErrorSubscription = this._userService.deleteUserError.subscribe(
      (err) => {
        if (err) {
          console.log(err);
          this.deleteUserError();
        }
      }
    );
  }

  ngOnDestroy():any {
    this.userSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  private initializeUser():void {
    this.user = this._userService.getUserFromLocalStorage();
  }

  private updateUser():void{
    if (this.userForm.dirty && this.userForm.valid) {
      this.updatingUser = true;
      this.user.email = this.userForm.value.email;
      this.user.name = this.userForm.value.name;
      this.user.company = this.userForm.value.company;
      this.user.jobTitle = this.userForm.value.jobTitle;
      this.user.phone = this.userForm.value.phone;
      this.user.admin = false;
      this._userService.updateUser(this.user.id, this.user);
    }
  }

  private goToChangePassword():void {
    this._navController.push(ChangePasswordPage, this.user);
  }

  private userDeleted(): void {
    this._authService.logOut();
     let alert = Alert.create({
      title: 'Deleted!',
      subTitle: 'Your account has been deleted. Please note that if you wish to unregister for an event you must do so through the email that which you used to register.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this._navController.setRoot(LoginPage);
          }
        }
      ]
    });
    this._navController.present(alert);
  }

  private deleteUserError(): void {
     let alert = Alert.create({
      title: 'Woops!',
      subTitle: 'An error occurred and your account cannot be deleted at this time. Please try again later.',
      buttons: [
        {
          text: 'OK',
          handler: () => {

          }
        }
      ]
    });
    this._navController.present(alert);
  }

  private deleteUser():void {
    let confirm = Alert.create({
      title: 'Delete your account?',
      message: 'Are you sure you wish to delete your account? This will not unregister you from any registered events',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.deletingUser = true;
            this._userService.deleteUser(this.user.id);
          }
        }
      ]
    });
    this._navController.present(confirm);
  }

}
