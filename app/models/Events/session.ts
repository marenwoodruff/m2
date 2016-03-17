import {Speaker} from './speaker';
import {SessionLocation} from "./location";


export class Session {
    Id:number;
    name:number;
    speakers:Speaker[];
    sessionLocation:SessionLocation;
    time:Date;
    overview:string;
    targetAudience:string;
}
