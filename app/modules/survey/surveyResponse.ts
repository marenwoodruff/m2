import {User} from "./user";
import {Response} from "./response";

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

