import {Page} from 'ionic-angular';
import {OnInit} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/twitter/twitter.page.html'
})

export class TwitterPage {
  constructor() {
    !function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
      p = /^http:/.test(d.location) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + "://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, "script", "twitter-wjs");
  }
}
