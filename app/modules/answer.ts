//<reference path="./option.ts" />

module Matrix.MyMatrix {

    export class Answer {
        type:string;
        options:Option[];

        constructor(type?:string, options?:Option[]) {
            this.type = type;
            this.options = options;
        }
    }
}


