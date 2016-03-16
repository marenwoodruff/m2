import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {SurveyService} from '../../../service/survey.service';
import {List, Item, NavController} from 'ionic-angular';
import {Survey} from '../../survey/survey';
import {Event} from '../../events/event';

@Component({
  selector: 'session',
  templateUrl: 'build/modules/components/session/session.component.html',
  inputs:['session'],
  directives: [List, Item],
  providers:[SurveyService]
})

export class SessionComponent implements OnInit, OnDestroy{
  event:Event;
  private _surveyApi: SurveyService;
  public survey: Survey;
  navController: NavController;

  constructor(surveyService:SurveyService, navController: NavController) {
    this._surveyApi = surveyService;
    this.navController = navController;
  }
  ngOnInit():any{
    this._surveyApi.survey.subscribe(
      survey => {this.survey = survey; console.log(survey)},
      err => console.log('SurveysComponent subscribe error:', err),
      () =>  console.log('finished subscribing to surveys')
    );

    this._surveyApi.getSurvey(287182928);

  }
  ngOnDestroy() {
    this._surveyApi.surveys.unsubscribe();
  }

}
