/**
 * Created by Abbey on 3/10/2016.
 */
import {Component} from 'angular2/core';
import {Event} from '../../events/event';
import {Item} from 'ionic-angular';

@Component({
    selector: "event",
    templateUrl: 'build/modules/components/events/event.component.html',
    directives: [Item],
    inputs:['event']
})
export class EventComponent{
    event:Event;
}