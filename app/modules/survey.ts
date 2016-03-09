//<reference path="./question.ts" />

export module Matrix.MyMatrix {

    export class Survey {
        id:number;
        name:string;
        questions:Question[];

        constructor(id?:number, name?:string, questions?:Question[]) {
            this.id = id;
            this.name = name;
            this.questions = questions;
        }
    }
}


