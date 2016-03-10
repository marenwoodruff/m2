export class Response {
    questionId:number;
    selections:Selection[];


    constructor(questionId?:number, selections?:Selection[]) {
        this.questionId = questionId;
        this.selections = selections;
    }
}
