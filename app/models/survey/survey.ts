import {Question} from "./question";

export class Survey {
    id:number;
    eventId:number;
    eventTitle: string;
    preEvent: boolean;
    name:string;
    questions:Question[];
}
