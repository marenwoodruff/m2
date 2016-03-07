import {Injectable} from 'angular2/core';

@Injectable()

export class LoggingService {
  Log(message: string, object?: any) {
		console.log(message, object);
	}
}
