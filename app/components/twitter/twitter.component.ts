import {Component, OnInit, OnDestroy} from '@angular/core';
import {TwitterService} from '../../service/twitter.service';

@Component({
  selector: 'twitter',
  templateUrl: 'build/components/twitter/twitter.component.html',
  providers: [TwitterService]
})

export class TwitterComponent implements OnInit, OnDestroy{
  private _twitterApi: TwitterService;
  public feed;

  constructor(twitterService: TwitterService ) {
    this._twitterApi = twitterService;
  }
  ngOnInit():any{
    this._twitterApi.feed.subscribe(
      feed => this.feed = feed,
      err => console.log('SurveysComponent subscribe error:', err),
      () =>  console.log('finished subscribing to surveys')
    );

    this._twitterApi.getMatrixFeed();
  }
  ngOnDestroy() {
    this._twitterApi.feed.unsubscribe();
  }
}
