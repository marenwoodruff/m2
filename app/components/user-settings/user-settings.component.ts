import {EventEmitter, Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Button, List, Item, TextInput, Label, NavController} from 'ionic-angular';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user/user';
import {EventsPage} from '../../pages/events/events.page';
import {LoaderComponent} from '../loader/loader.component';
import {ValidationService} from '../../service/validation.service';


@Component({
  selector: 'user-settings',
  templateUrl: 'build/components/user-settings/user-settings.component.html',
  directives: [Button, List, Item, TextInput, Label, LoaderComponent]
})

export class UserSettingsComponent implements OnInit, OnDestroy {
  private updatingUser: boolean;
  private errorMessage: string;
  private userSubscription: EventEmitter<User>;
  private errorSubscription: EventEmitter<any>;
  private userForm: ControlGroup;
  private user: User;

  constructor(
    private _userService: UserService,
    private _navController: NavController,
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
    this.user = this._userService.getUserFromLocalStorage();
    this.userSubscription = this._userService.user.subscribe(
        (user) => {
          console.log(user);
          // this._navController.setRoot(EventsPage);
        }
      )
    this.errorSubscription = this._userService.error.subscribe(
      (error) => {
        console.log(error);
        this.updatingUser = false;
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

  updateUser(){
    if (this.userForm.dirty && this.userForm.valid) {
      this.updatingUser = true;
      this.user.email = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
      this.user.name = this.userForm.value.name;
      this.user.company = this.userForm.value.company;
      this.user.jobTitle = this.userForm.value.jobTitle;
      this.user.phone = this.userForm.value.phone;
      this.user.admin = false;
      this._userService.updateUser(this.user.id, this.user);
    }
  }

}
