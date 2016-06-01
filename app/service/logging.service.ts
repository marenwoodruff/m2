import {Injectable} from '@angular/core';

@Injectable()
export class LoggingService {
    Log(message:string, object?:any) {
        console.log(message, object);
    }
}

