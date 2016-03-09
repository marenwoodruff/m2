//<reference path="./response.ts" />
//<reference path="./selection.ts" />

module Matrix.MyMatrix {

    export class Response {
        questionId:number;
        selections:selection[];

        constructor(questionId?:number, selections?:selection[]) {
            this.questionId = questionId;
            this.selections = selections;
        }
    }
}
