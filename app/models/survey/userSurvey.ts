export class UserCompletedSurvey {
  eventId: number;
  surveyId: number;
  surveyName: string;
  userId: number;

  constructor(eventId:number, surveyId: number, surveyName: string, userId: number) {
    this.eventId = eventId;
    this.surveyId = surveyId;
    this.surveyName = surveyName;
    this.userId = userId;
  }
}