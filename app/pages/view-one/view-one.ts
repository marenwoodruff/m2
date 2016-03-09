import {Page} from 'ionic-angular';
import {OnInit} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/view-one/view-one.html'
})
export class ViewOnePage implements OnInit {

    ngOnInit() {
      console.log('hi');
    }

}
