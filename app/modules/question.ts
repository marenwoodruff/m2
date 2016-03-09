//<reference path="./answer.ts" />

module Matrix.MyMatrix {

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
}
