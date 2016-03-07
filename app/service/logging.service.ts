import {Injectable} from 'angular2/core';

export module Matrix.MyMatrix {

    @Injectable()
    export class LoggingService {
        Log(message:string, object?:any) {
            console.log(message, object);
        }
    }
}
