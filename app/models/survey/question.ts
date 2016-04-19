import {Answer} from "./answer";

export class Question {
    id:number;
    text:string;
    answer:Answer;

    constructor(questionId?:number, text?:string, answer?:Answer) {
        this.id = questionId;
        this.text = text;
        this.answer = answer;
    }
}
