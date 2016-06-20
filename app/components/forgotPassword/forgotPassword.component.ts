import {EventEmitter, Component, OnInit, OnDestroy, Input} from '@angular/core';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from '@angular/common';
import {Button, List, Item, TextInput, Label, Nav} from 'ionic-angular';
import {UserService} from '../../service/user.service';
import {LoaderComponent} from '../loader/loader.component';
import {ValidationService} from '../../service/validation.service';
import {ControlMessageComponent} from '../controlMessage/controlMessage.component';

@Component({
  selector: 'forgotPassword',
  templateUrl: 'build/components/forgotPassword/forgotPassword.component.html',
  directives: [Button, List, Item, TextInput, Label, LoaderComponent, ControlMessageComponent]
})

export class ForgotPasswordComponent{
  private requestingEmail: boolean;
  private errorMessage: string;
  private successMessage: string;
  private forgotPasswordSubscription: EventEmitter<boolean>;
  private errorSubscription: EventEmitter<any>;
  private forgotPasswordForm: ControlGroup;
  private passwordGroup: ControlGroup;
  private userId: number;

  constructor(
    private _userService: UserService,
    private _navController: Nav,
    private _formBuilder: FormBuilder) {
      this.forgotPasswordForm = this._formBuilder.group({
        'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      });
  }

  ngOnInit(): any {
    this.forgotPasswordSubscription = this._userService.forgotPasswordSuccess.subscribe(
        (success) => {
          if (success) {
            this.requestingEmail = false;
            this.successMessage = "Email sent!";
            this.errorMessage = null;
          }
        }
      )
    this.errorSubscription = this._userService.forgotPasswordError.subscribe(
      (error) => {
        console.log(error);
        this.requestingEmail = false;
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
    this.forgotPasswordSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  private forgotPassword():void{
    this.requestingEmail = true;
    if (this.forgotPasswordForm.dirty && this.forgotPasswordForm.valid){
      this._userService.forgotPassword(this.forgotPasswordForm.value.email);
    }
  }

}
