import {Answer} from "./answer";

export class Question {
    questionId:number;
    text:string;
    answer:Answer;

    constructor(questionId?:number, text?:string, answer?:Answer) {
        this.questionId = questionId;
        this.text = text;
        this.answer = answer;
    }
}
