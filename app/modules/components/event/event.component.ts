import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {SurveyService} from '../../../service/survey.service';
import {List, Item, NavController} from 'ionic-angular';
import {SessionPage} from '../../../pages/session/session.page';
import {Survey} from '../../survey/survey';
import {Event} from '../../events/event';


@Component({
  selector: 'event',
  templateUrl: 'build/modules/components/event/event.component.html',
  inputs:['event'],
  directives: [List, Item],
  providers:[SurveyService]
})

export class EventComponent implements OnInit, OnDestroy{
  event:Event;
  private _surveyApi: SurveyService;
  public surveys: Survey[];
  navController: NavController;

  constructor(surveyService:SurveyService, navController: NavController) {
    this._surveyApi = surveyService;
    this.navController = navController;
  }
  ngOnInit():any{
    this._surveyApi.surveys.subscribe(
      surveys => this.surveys = surveys,
      err => console.log('SurveysComponent subscribe error:', err),
      () =>  console.log('finished subscribing to surveys')
    );

    this._surveyApi.getSurveys(this.event.id);
  }
  ngOnDestroy() {
    this._surveyApi.surveys.unsubscribe();
  }

  goToSession(session) {
    this.navController.push(SessionPage, { session });
  }
}
