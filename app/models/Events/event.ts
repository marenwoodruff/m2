import {Session} from "./session";
import {Location} from './location';

export class Event {

    id:number;
    name:number;
    image:string;
    description:string;
    starts:Date;
    ends:Date;
    sessions:Session[];
    location: Location;
}