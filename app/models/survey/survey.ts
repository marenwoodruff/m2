import {Question} from "./question";

export class Survey {
    id:number;
    eventId:number;
    eventTitle: string;
    name:string;
    questions:Question[];
}
