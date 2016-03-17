/**
 * Created by Abbey on 3/9/2016.
 */
import {Speaker} from './speaker';
import {SessionLocation} from "./location";


export class Session {
    Id:number;
    name:number;
    speakers:Speaker[];
    location:SessionLocation;
    time:Date;
    description:string;
}
