import {EventEmitter, Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Button, List, Item, TextInput, Label, NavController} from 'ionic-angular';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user/user';
import {EventsPage} from '../../pages/events/events.page';
import {AuthorizationService} from '../../service/authorization.service';
import {LoaderComponent} from '../loader/loader.component';
import {ValidationService} from '../../service/validation.service';


@Component({
  selector: 'signup',
  templateUrl: 'build/components/signup/signup.component.html',
  directives: [Button, List, Item, TextInput, Label, LoaderComponent]
})

export class SignupComponent implements OnInit, OnDestroy {
  private signingUp: boolean;
  private errorMessage: string;
  private userSubscription: EventEmitter<User>;
  private errorSubscription: EventEmitter<any>;
  private userForm: ControlGroup;

  constructor(
    private _userService: UserService,
    private _navController: NavController,
    private _authService:AuthorizationService,
    private _formBuilder: FormBuilder) {
      this.userForm = this._formBuilder.group({
        'email': ['', Validators.required],
        'password': ['', Validators.required],
        'name': ['', Validators.required],
        'company': [''],
        'jobTitle': [''],
        'phone': ['', Validators.compose([ValidationService.phoneNumberValidator])]
      })
  }

  ngOnInit(): any {
    this.userSubscription = this._userService.user.subscribe(
        (user) => {
          console.log(user);
          this._navController.setRoot(EventsPage);
        }
      )
    this.errorSubscription = this._authService.error.subscribe(
      (error) => {
        console.log(error);
        this.signingUp = false;
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

  signUp(){
    if (this.userForm.dirty && this.userForm.valid) {
      this.signingUp = true;
      const user = new User();
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

}
