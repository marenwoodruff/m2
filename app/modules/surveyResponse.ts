export module Matrix.MyMatrix {

    export class SurveyResponse {
        user:User{};
        surveyId:number;
        responses:response[];

        constructor(user?:object, surveyId?:number, responses?:response[]) {
            this.user = user;
            this.surveyId = surveyId;
            responses = responses;
        }
    }
}
