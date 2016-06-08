import {Component, forwardRef, OnChanges, OnInit} from '@angular/core';
import {List, Item} from 'ionic-angular';
import {SurveyDescriptionComponent} from '../survey-description/survey-description.component';
import {Survey} from '../../models/survey/survey';
import {SurveyProgress} from '../../models/survey/surveyProgress';
import * as moment from 'moment';

@Component({
  selector: 'surveys',
  templateUrl: 'build/components/surveys/surveys.component.html',
  directives: [List, Item, forwardRef(() => SurveyDescriptionComponent)],
  inputs:['surveys', 'surveysInProgress', 'startedSurveys', 'eventSurveys', 'userEvents', 'eventSurveysPage', 'event']
})

export class SurveysComponent implements OnChanges, OnInit {
  private surveys: Survey[];
  private startedSurveys: Survey[];
  private surveysInProgress: SurveyProgress[];
  private preEvents: Array<any>;
  private postEvents: Array<any>;
  private eventSurveysPage: boolean;

  ngOnInit() {
    this.getPrePostEvents(this.userEvents);
  }

  ngOnChanges() {
    if (this.surveys && this.startedSurveys) {
      this.surveys.forEach((survey, index) => {
        this.startedSurveys.forEach((startedSurvey, sIndex) => {
          if (survey.id === startedSurvey.id) {
            this.surveys[index] = startedSurvey;     
          }
        });
      });
    }  
  }

  getPrePostEvents(userEvents:any) {
    if (!this.eventSurveysPage) {
      this.preEvents = userEvents.filter((event) => {
        if (moment.unix(event.startDate).isSameOrAfter()) {
          return true;
        }
      });
      
      this.postEvents = userEvents.filter((event) => {
        if (moment.unix(event.startDate).isSameOrBefore()) {
          return true;
        }
      });

      this.sortPreEventSurveys(this.preEvents, this.eventSurveys, this.surveys);
    }
  }

  sortPreEventSurveys(preEvents:any, eventSurveys:any, surveys:Survey[]) {
    if (preEvents.length > 0) {
      this.eventSurveys = eventSurveys.filter((eventSurvey) => {
        let preEventMatch = preEvents.find(event => event.eventId === eventSurvey.eventId);
        if (preEventMatch) {
          return true;
        }
      });

    }

    this.surveys = surveys.filter((survey) => {
      let match = this.eventSurveys.find(eSurvey => eSurvey.surveyId === survey.id);
      if (match && survey.preEvent === true) {
        return true;
      }
    });
  }

}
