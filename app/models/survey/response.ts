import {Selection} from './selection';

export class Answer {
    questionId:number;
    selections:Selection[];

    constructor(questionId?:number, selections?:Selection[]) {
        this.questionId = questionId;
        this.selections = selections;
    }
}
