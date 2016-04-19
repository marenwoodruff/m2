//<reference path="./response.ts" />
//<reference path="./user.ts" />

import {Answer} from "./response";

export class SurveyResponse {
    eventId:number;
    eventTitle:string;
    answers:Answer[];

    constructor(eventId?:number, eventTitle?:string, answers?:Answer[]) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.answers = answers;
    }
}
