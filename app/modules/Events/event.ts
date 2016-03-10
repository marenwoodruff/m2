import {Session} from "./session";

export class Event {

    id:number;
    name:number;
    image:string;
    description:string;
    starts:Date;
    ends:Date;
    sesions:Session[]

}