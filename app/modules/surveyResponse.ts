//<reference path="./response.ts" />
//<reference path="./user.ts" />

module Matrix.MyMatrix {

    export class SurveyResponse {
        user:User;
        surveyId:number;
        responses:Response[];

        constructor(user?:User, surveyId?:number, responses?:Response[]) {
            this.user = user;
            this.surveyId = surveyId;
            this.responses = responses;
        }
    }
}
