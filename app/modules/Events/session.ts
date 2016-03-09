/**
 * Created by Abbey on 3/9/2016.
 */

import Speaker from "./app/modules/speaker";
import Location from "./app/modules/location";


export class Session {
    Id:number;
    name:number;
    speakers:Speaker[];
    location:Location;
    time:Date;
}