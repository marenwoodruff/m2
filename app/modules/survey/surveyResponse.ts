//<reference path="./response.ts" />
//<reference path="./user.ts" />

import {User} from "./../user";
import {Response} from "./response";

// module Matrix.MyMatrix {
//
//     export class SurveyResponse {
//         user:User;
//         surveyId:number;
//         responses:Response[];
//
//         constructor(user?:User, surveyId?:number, responses?:Response[]) {
//             this.user = user;
//             this.surveyId = surveyId;
//             this.responses = responses;
//         }
//     }
// }
// export default Matrix.MyMatrix.SurveyResponse;
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
