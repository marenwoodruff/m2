import {EventEmitter, Component, OnInit, OnDestroy, Input} from '@angular/core';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from '@angular/common';
import {Button, List, Item, TextInput, Label, Nav} from 'ionic-angular';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user/user';
import {EventsPage} from '../../pages/events/events.page';
import {AuthorizationService} from '../../service/authorization.service';
import {LoaderComponent} from '../loader/loader.component';
import {ControlMessageComponent} from '../controlMessage/controlMessage.component';
import {ValidationService} from '../../service/validation.service';

@Component({
  selector: 'signup',
  templateUrl: 'build/components/signup/signup.component.html',
  directives: [Button, List, Item, TextInput, Label, LoaderComponent, ControlMessageComponent]
})

export class SignupComponent implements OnInit, OnDestroy {
  private signingUp: boolean;
  private signupErrorMessage: string;
  private userSubscription: EventEmitter<User>;
  private errorSubscription: EventEmitter<any>;
  private userForm: ControlGroup;

  constructor(
    private _userService: UserService,
    private _navController: Nav,
    private _authService:AuthorizationService,
    private _formBuilder: FormBuilder) {
      this.userForm = this._formBuilder.group({
        'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
        matchingPassword: this._formBuilder.group({
          password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
          confirmPassword: ['', Validators.compose([Validators.required])]
        }, {validator: this.checkPasswords}),
        'name': ['', Validators.required],
        'company': [''],
        'jobTitle': [''],
        'phone': ['', Validators.compose([ValidationService.phoneNumberValidator])],
      })
  }

  ngOnInit(): any {
    this.userSubscription = this._userService.user.subscribe(
        (user) => {
          console.log(user);
          this._navController.setRoot(EventsPage);
        }
      )
    this.errorSubscription = this._authService.createUserError.subscribe(
      (error) => {
        console.log(error);
        this.signingUp = false;
        if (error.message){
          this.signupErrorMessage = error.message;
        }
      }
    )
  }

  ngOnDestroy():any {
    this.userSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  private signUp():void {
    if (this.userForm.dirty && this.userForm.valid) {
      this.signingUp = true;
      let user = new User();
      user.email = this.userForm.value.email;
      user.password = this.userForm.value.password;
      user.name = this.userForm.value.name;
      user.company = this.userForm.value.company;
      user.jobTitle = this.userForm.value.jobTitle;
      user.phone = this.userForm.value.phone;
      user.admin = false;
      this._authService.createUser(user);
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
