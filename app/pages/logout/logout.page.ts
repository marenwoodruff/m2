import {Component, OnInit} from '@angular/core';
import {Nav, MenuController} from 'ionic-angular';
import {LoaderComponent} from '../../components/loader/loader.component';
import {AuthorizationService} from '../../service/authorization.service';
import {LoginPage} from '../login/login.page';

@Component({
  templateUrl: 'build/pages/logout/logout.page.html',
  directives: [LoaderComponent]
})

export class LogoutPage implements OnInit{
  constructor(
      private _authService:AuthorizationService,
      private nav:Nav,
      private _menuController:MenuController){}

  ngOnInit(){
    this._menuController.swipeEnable(false);
    this._menuController.enable(false);
    this._authService.logOut();
    this.nav.push(LoginPage);
  }
  
}
