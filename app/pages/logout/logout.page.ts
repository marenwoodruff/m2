import {Page, Nav} from 'ionic-angular';
import {OnInit} from '@angular/core';
import {LoaderComponent} from '../../components/loader/loader.component';
import {AuthorizationService} from '../../service/authorization.service';
import {LoginPage} from '../login/login.page';

@Page({
  templateUrl: 'build/pages/logout/logout.page.html',
  directives: [LoaderComponent]
})

export class LogoutPage implements OnInit{
  constructor(private _authService:AuthorizationService, private nav:Nav){}

  ngOnInit(){
    this._authService.logOut();
    this.nav.push(LoginPage);
  }

}
