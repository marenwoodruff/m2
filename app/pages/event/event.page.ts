import {Page, NavParams} from 'ionic-angular';
import {OnInit, OnDestroy} from 'angular2/core';
import {EventComponent} from '../../components/event/event.component';
import {SurveysComponent} from '../../components/surveys/surveys.component';
import {SurveyService} from '../../service/survey.service';
import {DateFormatPipe} from 'angular2-moment';
import {Survey} from '../../models/survey/survey';
import {Event} from '../../models/events/event';

@Page({
    templateUrl: 'build/pages/event/event.page.html',
    directives: [EventComponent, SurveysComponent],
    providers:[SurveyService],
    pipes: [DateFormatPipe]
})

export class EventPage implements OnInit, OnDestroy{
  params: NavParams;
  event: Event;
  page: string = "overview";
  private _surveyApi: SurveyService;
  public surveys: Survey[];

  constructor(surveyService:SurveyService, navParams: NavParams) {
    this.params = navParams;
    this._surveyApi = surveyService;
  }

  ngOnInit():any{
    this.event = this.params.get('event');
    this._surveyApi.surveys.subscribe(
      surveys => this.surveys = surveys,
      err => console.log('SurveysComponent subscribe error:', err),
      () =>  console.log('finished subscribing to surveys')
    );

    this._surveyApi.getSurveys(null, this.event.id);

  }
  ngOnDestroy() {
    this._surveyApi.surveys.unsubscribe();
  }

}
