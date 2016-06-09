import {Component, forwardRef, OnChanges} from '@angular/core';
import {List, Item} from 'ionic-angular';
import {SurveyDescriptionComponent} from '../survey-description/survey-description.component';
import {Survey} from '../../models/survey/survey';
import {SurveyProgress} from '../../models/survey/surveyProgress';

@Component({
  selector: 'surveys',
  templateUrl: 'build/components/surveys/surveys.component.html',
  directives: [List, Item, forwardRef(() => SurveyDescriptionComponent)],
  inputs:['surveys', 'surveysInProgress', 'startedSurveys', 'eventSurveys', 'userEvents', 'eventSurveysPage', 'event']
})

export class SurveysComponent implements OnChanges {
  surveys: Survey[];
  startedSurveys: Survey[];
  surveysInProgress: SurveyProgress[];

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

}
