import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {LoaderComponent} from '../../components/loader/loader.component';
import {AuthorizationService} from '../../service/authorization.service';
import {LoginPage} from '../login/login.page';

@Page({
  templateUrl: 'build/pages/logout/logout.page.html',
  directives: [LoaderComponent]
})

export class LogoutPage implements OnInit{
  constructor(private _authService:AuthorizationService, private nav:NavController){}

  ngOnInit(){
    this._authService.logOut();
    this.nav.setRoot(LoginPage);
  }

}
