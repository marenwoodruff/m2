import {Option} from "./option";

export class Answer {
    type:string;
    options:Option[];

    constructor(type?:string, options?:Option[]) {
        this.type = type;
        this.options = options;
    }
}
